import { Injectable, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ApiRequestService } from '../../Services/api-request.service';
import { ProductOverview, SaveProduct } from './product.model';
import { Product } from '../../Shared/Classes/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly apiRequest = inject(ApiRequestService);

  addProduct(saveData: SaveProduct, ProductImages: any[]): Observable<any> {
    return this.apiRequest.post('api/product/add', saveData).pipe(
      switchMap((response: any) => {
        const formData = new FormData();
        formData.append('ProductId', response.Product_ID);

        for (let i = 0; i < ProductImages.length; i++) {
          formData.append('ProductImage', ProductImages[i]);
        }

        return this.apiRequest.postImage('api/product/upload-images', formData);
      })
    );
  }

  getAllProducts(): Observable<ProductOverview[]> {
    return this.apiRequest.get('api/product/admin/GetAllProducts');
  }

  updateProductStatus(Product_ID: number, Status: boolean) {
    return this.apiRequest.post('api/product/UpdateStatus/' + Product_ID +'/'+Status, Status);
  }
  getProduct(Product_ID: any): Observable<Product> {
    return this.apiRequest.get('api/product/admin/' + Product_ID);
  }
}
