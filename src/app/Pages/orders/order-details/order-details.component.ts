import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../../Services/util.service';
import { OrdersService } from '../orders.service';
import { Order_Item } from '../order.model';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  // Injections
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly OrderServices = inject(OrdersService);
  readonly util = inject(UtilService);
  
  // Variables
  itemList:Order_Item[] =[];
}
