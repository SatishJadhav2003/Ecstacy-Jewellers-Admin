import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable } from 'rxjs';
import { OrderOverview, Order_Item, Order_Status } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  readonly apiRequest = inject(ApiRequestService);


  getAllOrdersOverview():Observable<OrderOverview[]>
  {
    return  this.apiRequest.get('api/order/ordersoverview');
  }
  getOrderItems(Order_ID:number):Observable<Order_Item[]>
  {
    return  this.apiRequest.get('api/order/orderItems/'+Order_ID);
  }

  getOrderDliveryStatus(Order_ID:number):Observable<Order_Status[]>
  {
    return  this.apiRequest.get('api/order/DeliveryStatus/'+Order_ID);
  }

  saveStatus(data:any)
  {
    return this.apiRequest.post("api/order/UpdateStatus",data)
  }

}
