import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable } from 'rxjs';
import { OrderOverview } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  readonly apiRequest = inject(ApiRequestService);


  getAllOrdersOverview():Observable<OrderOverview[]>
  {
    return  this.apiRequest.get('api/order/ordersoverview');
  }

}
