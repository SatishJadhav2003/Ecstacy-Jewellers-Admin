import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Eye, LucideAngularModule, Plus, Search, Trash2 } from 'lucide-angular';
import { SearchPipe } from '../../Pipes/search.pipe';
import { ProductOverview } from './product.model';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    SearchPipe,
    RouterModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  // Variables
  searchInput: string = '';
  prodList: ProductOverview[] = [];

  // Lucide
  readonly search = Search;
  readonly delete = Trash2;
  readonly eye = Eye;

  // Injections
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly productService = inject(ProductService);

  ngOnInit() {
    this.getProdutsList();
  }
  onAddProduct() {
    this.router.navigate(['/home/addproduct'], {
      relativeTo: this.route,
    });
  }

  getProdutsList() {
    this.productService.getAllProducts().subscribe((res) => {
      this.prodList = res;
    });
  }
}
