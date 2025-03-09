import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Banner } from '../../../Shared/Classes/Banner';
import { imageUrl } from '../../../app.config';

@Component({
  selector: 'app-zoom-banner-image',
  standalone: true,
  imports: [],
  templateUrl: './zoom-banner-image.component.html',
  styleUrl: './zoom-banner-image.component.css'
})
export class ZoomBannerImageComponent {
  @Input() banner!: Banner;
  @Output() close = new EventEmitter<boolean>();

  getImage() {
   
    if (this.banner.Banner_Image.length > 0) {
      return imageUrl + '/api/banner/images/' + this.banner.Banner_Image;
    }
    return 'assets/dummy/400_400.jpeg';
  }
 // Method to close the modal
 closeModal(status:boolean): void {
  this.close.emit(status);
}
}
