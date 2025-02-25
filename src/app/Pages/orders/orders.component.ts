import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Eye, LucideAngularModule,  Search, Trash2 } from 'lucide-angular';
import { SearchPipe } from '../../Pipes/search.pipe';
import { UtilService } from '../../Services/util.service';
import { ProductService } from '../products/product.service';
import { OrderOverview } from './order.model';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    LucideAngularModule,
    SearchPipe,
    RouterModule,],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  // Variables
  searchInput: string = '';
  ordersList: OrderOverview[] = [
    {
      Order_ID : 1,
      User_Name:"Satish Jadhav",
      Order_Date: new Date(),
      Status:"Placed",
      Amount:230037
    }
  ];

  // Lucide
  readonly search = Search;
  readonly delete = Trash2;
  readonly eye = Eye;

  // Injections
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly OrderServices = inject(OrdersService);
  readonly util = inject(UtilService);

  ngOnInit() {
    this.OrderServices.getAllOrdersOverview().subscribe((res)=>{
      this.ordersList = res;
    })
  }
  onViewOrder(Order_ID:number)
  {
    this.router.navigate(['/home/orderdetails/'+Order_ID], {
      relativeTo: this.route,
    });
  }
  
}
