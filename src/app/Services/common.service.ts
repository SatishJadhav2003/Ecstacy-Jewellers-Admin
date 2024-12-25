import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { Observable } from 'rxjs';
import { Category } from '../Shared/Classes/Category';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  readonly apiRequest = inject(ApiRequestService);

  getCategories(): Observable<Category[]> {
    return this.apiRequest.get('api/category');
  }
}
