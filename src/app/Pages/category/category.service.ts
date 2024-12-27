import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable } from 'rxjs';
import { Category } from '../../Shared/Classes/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly apiRequest = inject(ApiRequestService);

  addCategory(categoryName: string, categoryImage: any): Observable<any> {
    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('categoryImage', categoryImage);
    console.log(
      'FormData:',
      formData.get('categoryName'),
      formData.get('categoryImage')
    );

    return this.apiRequest.postImage('api/category/add', formData);
  }

  updateCategory(Category_ID: number, Category_Name: string): Observable<any> {
    return this.apiRequest.post(`api/category/updateCateName/${Category_ID}?newCategoryName=${encodeURIComponent(Category_Name)}`, null);
  }
  
  

  getAllCategories(): Observable<Category[]> {
    return this.apiRequest.get('api/category/GetAll');
  }

  updateStatus(Category_ID: number, Is_Active: boolean): Observable<any> {
    return this.apiRequest.post(
      'api/category/updateStatus/' + Category_ID + '/' + Is_Active,
      Is_Active
    );
  }

  updateFeature(Category_ID: number, Is_Feature: boolean): Observable<any> {
    return this.apiRequest.post(
      'api/category/updateFeature/' + Category_ID + '/' + Is_Feature,
      Is_Feature
    );
  }
}
