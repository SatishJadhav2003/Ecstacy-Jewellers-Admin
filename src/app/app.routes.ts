import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AuthGuard } from './Authentication/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent : () => import('./Authentication/login/login.component').then((m)=>m.LoginComponent)
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/home.routes').then((m) => m.routes),
    canActivate: [AuthGuard]
  },
];
