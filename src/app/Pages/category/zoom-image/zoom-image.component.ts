import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { imageUrl } from '../../../app.config';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../../../Services/api-request.service';
import { Category } from '../../../Shared/Classes/Category';

@Component({
  selector: 'app-zoom-image',
  standalone: true,
  imports: [],
  templateUrl: './zoom-image.component.html',
  styleUrl: './zoom-image.component.css',
})
export class ZoomImageComponent {
  @Input() cate!: Category;
  @Output() close = new EventEmitter<boolean>();

  imageToUpload!: File;
  previewImage: any;

  readonly apiRequest = inject(ApiRequestService);

  getImage() {
    if (this.imageToUpload) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.previewImage = event.target.result;
      };
      reader.readAsDataURL(this.imageToUpload);
      return this.previewImage;
    }
    if (this.cate.Category_Image.length > 0) {
      return imageUrl + '/api/category/images/' + this.cate.Category_Image;
    }
    return 'assets/dummy/400_400.jpeg';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.imageToUpload = input.files[0];
    }
    console.log(this.imageToUpload);
    this.getImage();
  }

  onUpdate() {
    this.updateCategoryImage(
      this.cate.Category_ID,
      this.imageToUpload
    ).subscribe(
      (res) => {
        console.log(res);
        this.closeModal(true);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateCategoryImage(categoryId: number, categoryImage: any): Observable<any> {
    const formData = new FormData();
    formData.append('categoryId', categoryId.toString());
    formData.append('newCategoryImage', categoryImage);
    console.log(
      'FormData:',
      formData.get('categoryId'),
      formData.get('newCategoryImage')
    );

    return this.apiRequest.postImage('api/category/updateImage', formData);
  }

  // Method to close the modal
  closeModal(status:boolean): void {
    this.close.emit(status);
  }
}
