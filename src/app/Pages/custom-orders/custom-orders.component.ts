import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Eye, LucideAngularModule,  Search, Trash2 } from 'lucide-angular';
import { SearchPipe } from '../../Pipes/search.pipe';
import { UtilService } from '../../Services/util.service';
import { OrdersService } from '../orders/orders.service';
import { CustomOrderOverview } from './customorder.model';

@Component({
  selector: 'app-custom-orders',
  standalone: true,
  imports: [ FormsModule,
    LucideAngularModule,
    SearchPipe,
    RouterModule,CommonModule],
  templateUrl: './custom-orders.component.html',
  styleUrl: './custom-orders.component.css'
})
export class CustomOrdersComponent {
  // Variables
  searchInput: string = '';
  ordersList: CustomOrderOverview[] = [
    
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
    this.OrderServices.getAllCustomOrdersOverview().subscribe((res)=>{
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
