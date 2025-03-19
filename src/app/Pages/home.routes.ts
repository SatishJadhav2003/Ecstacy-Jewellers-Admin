import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./category/category.component').then(
            (m) => m.CategoryComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'prices',
        loadComponent: () =>
          import('./prices/prices.component').then((m) => m.PricesComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'addproduct',
        loadComponent: () =>
          import('./products/add-product/add-product.component').then(
            (m) => m.AddProductComponent
          ),
      },
      {
        path: 'viewproduct/:ID',
        loadComponent: () =>
          import('./products/add-product/add-product.component').then(
            (m) => m.AddProductComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./orders/orders.component').then((m) => m.OrdersComponent),
      },
      {
        path: 'orderdetails/:ID',
        loadComponent: () =>
          import('./orders/order-details/order-details.component').then((m) => m.OrderDetailsComponent),
      },
      {
        path: 'customorders',
        loadComponent: () =>
          import('./custom-orders/custom-orders.component').then((m) => m.CustomOrdersComponent),
      },
      {
        path: 'customorderdetails/:ID',
        loadComponent: () =>
          import('./custom-orders/custom-order-overview/custom-order-overview.component').then((m) => m.CustomOrderOverviewComponent),
      },
      {
        path: 'banner',
        loadComponent: () =>
          import('./banners/banners.component').then((m) => m.BannersComponent),
      },
      {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
      }
    ],
  },
];
