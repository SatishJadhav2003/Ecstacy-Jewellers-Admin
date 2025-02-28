import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../../Services/util.service';
import { OrdersService } from '../orders.service';
import { Order_Item, Order_Status } from '../order.model';
import { imageUrl } from '../../../app.config';
import { CommonModule } from '@angular/common';
import { OrderStatusUpdateComponent } from "../order-status-update/order-status-update.component";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, OrderStatusUpdateComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  // Injections
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly OrderServices = inject(OrdersService);
  readonly util = inject(UtilService);

  // Variables
  itemList: Order_Item[] = [];
  orderStatus:Order_Status[]=[];
  canUpdate:boolean = false;
  updateStatus:boolean = false;
  Order_ID:number = 0;

  ngOnInit() {
    this.Order_ID = parseInt(this.route.snapshot.params['ID']);
    this.getOrderItems(this.Order_ID);
    this.getOrderDeliveryStatus(this.Order_ID);
  }

  getOrderItems(Order_ID: number) {
    this.OrderServices.getOrderItems(Order_ID).subscribe((res) => {
      this.itemList = res;
    });
  }
  getOrderDeliveryStatus(Order_ID: number) {
    this.OrderServices.getOrderDliveryStatus(Order_ID).subscribe((res) => {
      this.orderStatus = res;
      this.canUpdate = this.orderStatus[0].Status !="Delivered";
    });
  }
  getImage(path: string): string {
    return `${imageUrl}/api/product/images/${path}?height=48&width=48`;
  }

  addStatus(event:any)
  {
    this.updateStatus = false;
    if(event)
    {
      this.getOrderDeliveryStatus(this.Order_ID);
    }
  }

  onUpdateStatus()
  {
    this.updateStatus =true;
  }
}
