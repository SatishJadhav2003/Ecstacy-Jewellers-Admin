import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { Observable } from 'rxjs';
import { Category } from '../Shared/Classes/Category';
import { Metal, MetalData } from '../Shared/Classes/Metal';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  readonly apiRequest = inject(ApiRequestService);

  getCategories(): Observable<Category[]> {
    return this.apiRequest.get('api/category');
  }

  getMetalList(): Observable<Metal[]> {
    return this.apiRequest.get('api/metal');
  }
  getMetalPriceData(): Observable<MetalData[]> {
    return this.apiRequest.get('api/metal/getMetalData');
  }
  deleteMetalPrice(ID: Number): Observable<boolean> {
    return this.apiRequest.delete('api/metal/deletePrice/' + ID);
  }

  
}
