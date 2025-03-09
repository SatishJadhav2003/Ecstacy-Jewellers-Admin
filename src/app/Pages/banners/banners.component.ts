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
import { SearchPipe } from '../../Pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { UtilService } from '../../Services/util.service';
import { imageUrl } from '../../app.config';
import { BannerService } from './banner.service';
import { Banner } from '../../Shared/Classes/Banner';
import { ZoomBannerImageComponent } from './zoom-banner-image/zoom-banner-image.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
@Component({
  selector: 'app-banners',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    SearchPipe,
    FormsModule,
    ZoomBannerImageComponent,
    AddBannerComponent,
  ],
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.css',
})
export class BannersComponent {
  readonly search = Search;
  readonly more_horizontal = MoreHorizontal;
  readonly edit = Edit;
  readonly trash = Trash2;
  readonly plus = Plus;

  readonly cateService = inject(BannerService);
  readonly util = inject(UtilService);

  BannerList: Banner[] = [];
  selectedBanner!: Banner;
  isAddNew: boolean = false;
  isZoomImage: boolean = false;
  isUpdateCate: boolean = false;

  searchInput: string = '';

  ngOnInit() {
    this.getBannerList();
  }

  getBannerList() {
    this.cateService.getAllBanners().subscribe((res) => {
      console.log(res);
      this.BannerList = res;
    });
  }

  addBanner() {
    this.isAddNew = true;
  }

  BannerAddingStatus(status: any) {
    console.log(status);
    this.isAddNew = false;
    this.getBannerList();
  }
  

  deleteRow(ID: number,Image_Name:string) {
    this.cateService.removeImage(ID,Image_Name).subscribe((res) => {
      // if (res) {
        this.searchInput = '';
        this.util.success('Banner deleted');
        this.getBannerList();
      // } else {
      //   this.util.error('Error while deleting Banner , please try later');
      // }
      console.log(res);
    });
  }

  zoomImage(index: number) {
    this.isZoomImage = true;
    this.selectedBanner = this.BannerList[index];
  }

  onClose(event: boolean) {
    this.isZoomImage = false;
    
  }

  getImage(path: string): string {
    return imageUrl + '/api/banner/images/' + path + '?width=112&height=56';
  }
}
