import { Injectable, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ApiRequestService } from '../../Services/api-request.service';
import { ProductOverview, SaveProduct } from './product.model';
import { Product } from '../../Shared/Classes/product.model';
import { Product_Images } from '../../Shared/Classes/ProductImages';

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

  updateProduct(Product_ID: number, data: SaveProduct, ProductImages: any[]) {
    return this.apiRequest
      .post('api/product/updateproduct/' + Product_ID, data)
      .pipe(
        switchMap((response: any): Observable<any> => {
          if (ProductImages?.length <= 0) {
            return new Observable<boolean>((observer) => {
              observer.next(true);
              observer.complete();
            });
          } else {
            const formData = new FormData();
            formData.append('ProductId', Product_ID.toString());

            for (let i = 0; i < ProductImages.length; i++) {
              formData.append('ProductImage', ProductImages[i]);
            }

            return this.apiRequest.postImage(
              'api/product/upload-images',
              formData
            );
          }
        })
      );
  }

  getAllProducts(): Observable<ProductOverview[]> {
    return this.apiRequest.get('api/product/admin/GetAllProducts');
  }

  updateProductStatus(Product_ID: number, Status: boolean) {
    return this.apiRequest.post(
      'api/product/UpdateStatus/' + Product_ID + '/' + Status,
      Status
    );
  }
  getProduct(Product_ID: any): Observable<Product> {
    return this.apiRequest.get('api/product/admin/' + Product_ID);
  }

  getProductImages(Product_ID: any): Observable<Product_Images[]> {
    return this.apiRequest.get('api/productimages/' + Product_ID);
  }

  removeImage(ID:number, Image_Name: string): Observable<any> {
    const encodedFileName = encodeURIComponent(Image_Name);
    return this.apiRequest.delete('api/productimages/delete-image/'+ID+'/'+encodedFileName);
  }
}
