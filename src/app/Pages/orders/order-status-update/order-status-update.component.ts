import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-status-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-status-update.component.html',
  styleUrl: './order-status-update.component.css',
})
export class OrderStatusUpdateComponent {
  @Output() status = new EventEmitter<boolean>();
  @Input() orderID!: number;
  statusList: string[] = ['Shipped', 'Out For Delivery', 'Delivered'];
  selectedStatus: string = '';
  Location: string = '';
  DateTime: any;

  // Services
  readonly orderService = inject(OrdersService);

  closeModal(status: boolean): void {
    this.status.emit(status);
  }

  save() {
    const saveData: any = {
      Status_Timestamp: this.DateTime,
      Status: this.selectedStatus,
      Location: this.Location,
      Order_ID: this.orderID,
    };
    this.orderService.saveStatus(saveData).subscribe((res) => {
      this.closeModal(true);
    },err=>{
      console.log(err);
      
    });
  }
}
