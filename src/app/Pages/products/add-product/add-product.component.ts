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
import { ActivatedRoute } from '@angular/router';
import { Cross, Edit, LucideAngularModule, X } from 'lucide-angular';
import { Product_Images } from '../../../Shared/Classes/ProductImages';
import { imageUrl } from '../../../app.config';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  // icons
  readonly edit = Edit;
  readonly X = X;

  // Services
  readonly util = inject(UtilService);
  readonly common = inject(CommonService);
  readonly fb = inject(FormBuilder);
  readonly location = inject(Location);
  readonly productService = inject(ProductService);
  readonly route = inject(ActivatedRoute);
  // Variables
  @Output() status = new EventEmitter<boolean>();
  categoryList: Category[] = [];
  metalList: Metal[] = [];
  productForm!: FormGroup;
  ImagesToUpload: File[] = [];
  imagesList: Product_Images[] = [];
  Product_ID!: number;
  editMode: boolean = false;
  ngOnInit() {
    this.Product_ID = parseInt(this.route.snapshot.paramMap.get('ID') || '0');

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
    if (this.Product_ID) {
      // this.disableForm();
      this.getProductInfo();
      this.getImages();
    }
  }

  disableForm() {
    this.productForm.disable();
  }
  getProductInfo() {
    this.productService.getProduct(this.Product_ID).subscribe((res) => {
      console.log(res);
      this.productForm.patchValue({
        productTitle: res.Product_Name,
        description: res.Description,
        makingCharges: res.Making_Charges,
        weight: res.Weight,
        stockQuantity: res.Stock_Quantity,
        category: res.Category_ID,
        metal: res.Metal_ID,
      });
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

  getImages() {
    this.productService.getProductImages(this.Product_ID).subscribe((data) => {
      this.imagesList = data;
    });
  }

  getImage(path: string): string {
    return `${imageUrl}/api/product/images/${path}?height=90&width=96`;
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
    if (this.ImagesToUpload.length <= 0 && !this.Product_ID) {
      this.util.warn('Please select at least one image');
      return;
    }
    const saveData: SaveProduct = {
      Product_ID: this.Product_ID ?? 0,
      Product_Name: this.productForm.value.productTitle,
      Description: this.productForm.value.description,
      Price: this.productForm.value.makingCharges,
      Weight: this.productForm.value.weight,
      Stock_Quantity: this.productForm.value.stockQuantity,
      Category_ID: this.productForm.value.category,
      Metal_ID: this.productForm.value.metal,
    };

    if (this.Product_ID) {
      this.productService
        .updateProduct(this.Product_ID, saveData, this.ImagesToUpload)
        .subscribe((res) => {
          console.log(res);
          this.onCancel();
        });
      return;
    }

    this.productService
      .addProduct(saveData, this.ImagesToUpload)
      .subscribe((res) => {
        this.ImagesToUpload = [];
        this.productForm.reset();
      });
  }

  deleteImage(Product_ID: any, Image_Name: string) {
    this.productService
      .removeImage(this.Product_ID, Image_Name)
      .subscribe((res) => {
        console.log(res);
        this.util.success('Image Deleted Successfully');
        const index = this.imagesList.findIndex(
          (a) => a.Image_URL == Image_Name
        );
        this.imagesList.splice(index, 1);
      });
  }

  onCancel() {
    this.productForm.reset();
    this.location.back();
  }
}
