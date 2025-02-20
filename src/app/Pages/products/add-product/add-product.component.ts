import { Component, EventEmitter, Output, inject } from '@angular/core';
import { UtilService } from '../../../Services/util.service';
import { CommonService } from '../../../Services/common.service';
import { Category } from '../../../Shared/Classes/Category';
import { Metal } from '../../../Shared/Classes/Metal';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { SaveProduct } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  // Services
  readonly util = inject(UtilService);
  readonly common = inject(CommonService);
  readonly fb = inject(FormBuilder);
  readonly location = inject(Location);
  readonly productService = inject(ProductService);
  // Variables
  @Output() status = new EventEmitter<boolean>();
  categoryList: Category[] = [];
  metalList: Metal[] = [];
  productForm!: FormGroup;
  ImagesToUpload: File[] = [];

  ngOnInit() {
    this.getCategoryList();
    this.getMetalList();
    this.productForm = this.fb.group({
      productTitle: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      makingCharges: ['', [Validators.required, Validators.min(0)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      metal: ['', [Validators.required]],
    });
  }

  getCategoryList() {
    this.common.getCategories().subscribe((res) => {
      this.categoryList = res;
    });
  }

  getMetalList() {
    this.common.getMetalList().subscribe((res) => {
      this.metalList = res;
    });
  }

  // CRUD

  handleImageSelection(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        this.ImagesToUpload.push(input.files[i]);
      }
    }
  }
  onSubmit() {
    if (this.ImagesToUpload.length <=0) {
      this.util.warn("Please select at least one image");
      return;
    }
    const saveData: SaveProduct = {
      Product_Name: this.productForm.value.productTitle,
      Description: this.productForm.value.description,
      Price: this.productForm.value.makingCharges,
      Weight: this.productForm.value.weight,
      Stock_Quantity: this.productForm.value.stockQuantity,
      Category_ID: this.productForm.value.category,
      Metal_ID: this.productForm.value.metal,
    };
    console.log(saveData);
    console.log(this.ImagesToUpload);
    debugger;

    this.productService
      .addProduct(saveData, this.ImagesToUpload)
      .subscribe((res) => {
        console.log(res);
        this.ImagesToUpload = [];
        this.productForm.reset();
      });
  }

  onCancel() {
    this.productForm.reset();
    this.location.back();
  }
}
