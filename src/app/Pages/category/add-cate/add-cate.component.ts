import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../category.service';
import { UtilService } from '../../../Services/util.service';

@Component({
  selector: 'app-add-cate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-cate.component.html',
  styleUrl: './add-cate.component.css',
})
export class AddCateComponent {
  readonly cateService = inject(CategoryService);
  readonly util = inject(UtilService)
  @Output() status = new EventEmitter<boolean>();
  imageToUpload!: File | null;
  categoryName:string='';


  // Method to handle form submission
  onSubmit(): void {
    if (this.categoryName ) {
      this.cateService.addCategory(this.categoryName,this.imageToUpload).subscribe(
        (res) => {
          this.util.success(this.categoryName + " added successfully");
          console.log('Category added successfully:', res);
          this.categoryName ='';
          this.imageToUpload = null;
        },
        (err) => {
          console.error('Error adding category:', err);
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
