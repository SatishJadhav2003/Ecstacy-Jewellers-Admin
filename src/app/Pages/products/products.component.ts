import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Eye, LucideAngularModule, Plus, Search, Trash2 } from 'lucide-angular';
import { SearchPipe } from "../../Pipes/search.pipe";
import { ProductOverview } from './product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  // Variables
  searchInput:string='';
  prodList:ProductOverview[]=[
    {
      Product_ID:1,
      Product_Name:'Product 1',
      Price:100,
      Stock_Quantity:10,
      Is_Active:true
    },
    {
      Product_ID:2,
      Product_Name:'Product 2',
      Price:200,
      Stock_Quantity:20,
      Is_Active:false
    },
    {
      Product_ID:3,
      Product_Name:'Product 3',
      Price:300,
      Stock_Quantity:30,
      Is_Active:true
    },
    {
      Product_ID:4,
      Product_Name:'Product 4',
      Price:400,
      Stock_Quantity:40,
      Is_Active:false
    }
  ];

  

  // Lucide
  readonly search = Search;
  readonly delete = Trash2;
  readonly eye = Eye;
}
