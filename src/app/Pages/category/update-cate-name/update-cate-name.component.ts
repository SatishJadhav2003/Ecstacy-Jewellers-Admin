import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { UtilService } from '../../../Services/util.service';
import { CategoryService } from '../category.service';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../Shared/Classes/Category';

@Component({
  selector: 'app-update-cate-name',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-cate-name.component.html',
  styleUrl: './update-cate-name.component.css'
})
export class UpdateCateNameComponent {
  readonly cateService = inject(CategoryService);
  readonly util = inject(UtilService)
  @Output() catename = new EventEmitter<string>();
  @Input() cate!:Category;

  ngOnInit()
  {}


  onSubmit(): void {
    if (this.cate.Category_Name) {
      this.cateService.updateCategory(this.cate.Category_ID, this.cate.Category_Name).subscribe(
        (res) => {
          this.closeModal();
          this.util.success(`${this.cate.Category_Name} updated successfully`);
          console.log('Category updated successfully:', res);
        },
        (err) => {
          console.error('Error updating category:', err);
        }
      );
    } else {
      console.log('Form is invalid or Category_Name is empty');
    }
  }
  


  // Method to close the modal
  closeModal(): void {
    this.catename.emit(this.cate.Category_Name);
  }
}
