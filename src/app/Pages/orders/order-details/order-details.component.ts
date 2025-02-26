import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../../Services/util.service';
import { OrdersService } from '../orders.service';
import { Order_Item } from '../order.model';
import { imageUrl } from '../../../app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
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

  ngOnInit() {
    this.getOrderItems(this.route.snapshot.params['ID']);
  }

  getOrderItems(Order_ID: number) {
    this.OrderServices.getOrderItems(Order_ID).subscribe((res) => {
      this.itemList = res;
    });
  }
  getImage(path: string): string {
    return `${imageUrl}/api/product/images/${path}?height=48&width=48`;
  }
}
