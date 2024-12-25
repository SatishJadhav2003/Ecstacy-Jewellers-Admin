import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Edit,
  LucideAngularModule,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from 'lucide-angular';
import { MnDropdownComponent } from '../../Directives/dropdown';
import { AddCateComponent } from './add-cate/add-cate.component';
import { Category } from '../../Shared/Classes/Category';
import { CommonService } from '../../Services/common.service';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    MnDropdownComponent,
    AddCateComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  readonly search = Search;
  readonly more_horizontal = MoreHorizontal;
  readonly edit = Edit;
  readonly trash = Trash2;
  readonly plus = Plus;

  readonly cateService = inject(CategoryService);
  orders = [
    {
      id: '01',
      orderId: '#TWT5015100365',
      customerName: 'Marie Prohaska',
      location: 'Germany',
      orderDate: '08 Jun, 2023',
      payments: 'Credit Card',
      quantity: '05',
      price: '$146.99',
      totalAmount: '$749.95',
      status: 'Active',
    },
    {
      id: '02',
      orderId: '#TWT5015100366',
      customerName: 'Jaqueline Hammes',
      location: 'France',
      orderDate: '11 July, 2023',
      payments: 'Paypal',
      quantity: '02',
      price: '$450.00',
      totalAmount: '$900.00',
      status: 'No',
    },
    {
      id: '03',
      orderId: '#TWT5015100367',
      customerName: 'Marlene Hirthe',
      location: 'Argentina',
      orderDate: '21 Aug, 2023',
      payments: 'Visa Card',
      quantity: '03',
      price: '$147.23',
      totalAmount: '$294.46',
      status: 'New',
    },
    {
      id: '01',
      orderId: '#TWT5015100365',
      customerName: 'Marie Prohaska',
      location: 'Germany',
      orderDate: '08 Jun, 2023',
      payments: 'Credit Card',
      quantity: '05',
      price: '$146.99',
      totalAmount: '$749.95',
      status: 'Yes',
    },
    {
      id: '01',
      orderId: '#TWT5015100365',
      customerName: 'Marie Prohaska',
      location: 'Germany',
      orderDate: '08 Jun, 2023',
      payments: 'Credit Card',
      quantity: '05',
      price: '$146.99',
      totalAmount: '$749.95',
      status: 'Yes',
    },
    {
      id: '01',
      orderId: '#TWT5015100365',
      customerName: 'Marie Prohaska',
      location: 'Germany',
      orderDate: '08 Jun, 2023',
      payments: 'Credit Card',
      quantity: '05',
      price: '$146.99',
      totalAmount: '$749.95',
      status: 'Yes',
    },
    {
      id: '01',
      orderId: '#TWT5015100365',
      customerName: 'Marie Prohaska',
      location: 'Germany',
      orderDate: '08 Jun, 2023',
      payments: 'Credit Card',
      quantity: '05',
      price: '$146.99',
      totalAmount: '$749.95',
      status: 'Yes',
    },
  ];

  categoryList: Category[] = [];
  isAddCate: boolean = false;

  ngOnInit()
  {
    this.getCategoryList();
  }

  getCategoryList() {
    this.cateService.getAllCategories().subscribe((res) => {
      console.log(res);
      this.categoryList = res;
    });
  }

  addCategory() {
    this.isAddCate = true;
  }

  categoryAddingStatus(status: boolean) {
    console.log(status);
    this.isAddCate = false;
  }
}
