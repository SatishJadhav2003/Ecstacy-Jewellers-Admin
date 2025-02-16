import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PricesService {
  readonly apiRequest = inject(ApiRequestService);

  addPrice(pricedata: any): Observable<boolean> {
    return this.apiRequest.post('api/metal/saveMetalPrice', pricedata);
  }
}
