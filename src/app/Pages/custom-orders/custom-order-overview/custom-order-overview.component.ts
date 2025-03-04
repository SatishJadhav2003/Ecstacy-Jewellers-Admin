import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../../Services/util.service';
import { imageUrl } from '../../../app.config';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../orders/orders.service';
import { Order_Item, Order_Status } from '../../orders/order.model';
import { CustomOrderOverview } from '../customorder.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-custom-order-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-order-overview.component.html',
  styleUrl: './custom-order-overview.component.css',
})
export class CustomOrderOverviewComponent {
  // Injections
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly OrderServices = inject(OrdersService);
  readonly util = inject(UtilService);

  // Variables
  orderItem!: CustomOrderOverview;
  canUpdate: boolean = false;
  updateStatus: boolean = false;
  Order_ID: number = 0;

  ngOnInit() {
    this.Order_ID = parseInt(this.route.snapshot.params['ID']);
    this.orderItem = JSON.parse(localStorage.getItem('Custom_Order') ?? '');
    console.log(this.orderItem);
    if (!this.orderItem) {
      this.router.navigate(['/home/customorders'], {
        relativeTo: this.route,
      });
    }
  }

  getImage(path: string): string {
    return `${imageUrl}/api/customorder/images/${path}`;
  }
  changeStatus() {
    console.log(this.orderItem);
    
    this.OrderServices.updateCustoOrderStatus(
      this.orderItem.Order_ID,
      this.orderItem.Status
    ).subscribe((res) => {
      console.log(res);
      if(res)
      {
        localStorage.setItem('Custom_Order',JSON.stringify(this.orderItem));
      }
    });
  }
}
