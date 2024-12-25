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

  getAllCategories(): Observable<Category[]> {
    return this.apiRequest.get('api/category/GetAll');
  }
}