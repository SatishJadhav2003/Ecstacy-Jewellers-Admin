import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Edit,
  LucideAngularModule,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from 'lucide-angular';
import { AddCateComponent } from './add-cate/add-cate.component';
import { Category } from '../../Shared/Classes/Category';
import { CategoryService } from './category.service';
import { SearchPipe } from '../../Pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { UtilService } from '../../Services/util.service';
import { imageUrl } from '../../app.config';
import { ZoomImageComponent } from './zoom-image/zoom-image.component';
import { UpdateCateNameComponent } from './update-cate-name/update-cate-name.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    AddCateComponent,
    SearchPipe,
    FormsModule,
    ZoomImageComponent,
    UpdateCateNameComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  readonly search = Search;
  readonly more_horizontal = MoreHorizontal;
  readonly edit = Edit;
  readonly trash = Trash2;
  readonly plus = Plus;

  readonly cateService = inject(CategoryService);
  readonly util = inject(UtilService);

  categoryList: Category[] = [];
  selectedCategory!: Category;
  isAddCate: boolean = false;
  isZoomImage: boolean = false;
  isUpdateCate: boolean = false;

  searchInput: string = '';

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList() {
    this.cateService.getAllCategories().subscribe((res) => {
      console.log(res);
      this.categoryList = res;
    });
  }

  addCategory() {
    this.isAddCate = true;
  }

  categoryAddingStatus(status: boolean) {
    console.log(status);
    this.isAddCate = false;
  }

  changeStatus(index: number) {
    this.categoryList[index].Is_Active = !this.categoryList[index].Is_Active;
    this.cateService
      .updateStatus(
        this.categoryList[index].Category_ID,
        this.categoryList[index].Is_Active
      )
      .subscribe(
        (res) => {
          this.util.success('Status Updated');
        },
        (err) => {
          console.log(err);
          this.categoryList[index].Is_Active =
            !this.categoryList[index].Is_Active;
        }
      );
  }

  changeFeature(index: number) {
    this.categoryList[index].Is_Feature = !this.categoryList[index].Is_Feature;
    this.cateService
      .updateFeature(
        this.categoryList[index].Category_ID,
        this.categoryList[index].Is_Feature
      )
      .subscribe(
        (res) => {
          this.util.success('Feature Updated');
          this.getCategoryList();
        },
        (err) => {
          console.log(err);
          this.categoryList[index].Is_Feature =
            !this.categoryList[index].Is_Feature;
        }
      );
  }

  editCategory(index: number) {
    this.isUpdateCate = true;
    this.selectedCategory = this.categoryList[index];
  }

  updateCateStatus(catename: any) {
    this.isUpdateCate = false;
    const index = this.categoryList.findIndex(
      (d) => d.Category_ID === this.selectedCategory.Category_ID
    );
    if (index != -1) {
      this.categoryList[index].Category_Name = catename;
    }
  }

  zoomImage(index: number) {
    this.isZoomImage = true;
    this.selectedCategory = this.categoryList[index];
  }

  onClose(event: boolean) {
    this.isZoomImage = false;
    if (event) {
      this.getCategoryList();
    }
  }

  getImage(path: string): string {
    return imageUrl + '/api/category/images/' + path + '?width=56&height=56';
  }
}
