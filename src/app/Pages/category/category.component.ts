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
  isAddCate: boolean = false;
  isZoomImage: boolean = false;
  imageToZoom: string = '';
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

  zoomImage(index: number) {
    this.isZoomImage = true;
    this.imageToZoom = this.categoryList[index].Category_Image;
  }

  onClose(event: any) {
    this.isZoomImage = false;
  }

  getImage(path: string): string {
    return imageUrl + '/api/category/images/' + path;
  }
}
