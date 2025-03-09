import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UtilService } from '../../../Services/util.service';
import { BannerService } from '../banner.service';

@Component({
  selector: 'app-add-banner',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-banner.component.html',
  styleUrl: './add-banner.component.css'
})
export class AddBannerComponent {
  readonly cateService = inject(BannerService);
  readonly util = inject(UtilService)
  @Output() status = new EventEmitter<boolean>();
  imageToUpload!: File | null;
  BannerName:string='';


  // Method to handle form submission
  onSubmit(): void {
    if (this.imageToUpload ) {
      this.cateService.addBanner(this.imageToUpload.name,this.imageToUpload).subscribe(
        (res) => {
          this.util.success(this.BannerName + " added successfully");
          console.log('Banner added successfully:', res);
          this.BannerName ='';
          this.imageToUpload = null;
          this.status.emit(true);
        },
        (err) => {
          console.error('Error adding Banner:', err);
        }
      );
    } else {
      console.log('Form is invalid or no file selected');
    }
  }

  // Method to handle file input change event
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.imageToUpload = input.files[0];
    }
  }



  // Method to close the modal
  closeModal(): void {
    this.status.emit(false);
  }
}
