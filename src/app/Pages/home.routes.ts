import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
 
  {
    path: '',
    component: HomeComponent,
    children:[
        {
            path:'',
            loadComponent: () =>
            import('./dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        },
        {
          path:'category',
            loadComponent: () =>
            import('./category/category.component').then((m)=>m.CategoryComponent)
        }
    ]
  },
  
];
