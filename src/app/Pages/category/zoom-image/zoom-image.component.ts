import { Component, EventEmitter, Input, Output } from '@angular/core';
import { imageUrl } from '../../../app.config';

@Component({
  selector: 'app-zoom-image',
  standalone: true,
  imports: [],
  templateUrl: './zoom-image.component.html',
  styleUrl: './zoom-image.component.css',
})
export class ZoomImageComponent {
  @Input() image: string = '';
  @Output() close = new EventEmitter<boolean>();

  imageToUpload!: File;
  previewImage: any;

  getImage() {
    if (this.imageToUpload) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.previewImage = event.target.result;
      };
      reader.readAsDataURL(this.imageToUpload);
      return this.previewImage;
    }
    if (this.image.length > 0) {
      return imageUrl + '/api/category/images/' + this.image;
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

  // Method to close the modal
  closeModal(): void {
    this.close.emit(true);
  }
}
