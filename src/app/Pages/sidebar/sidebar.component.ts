import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  Calculator,
  ChartPie,
  CircleX,
  FileText,
  LucideAngularModule,
  Menu,
  Package,
  ShoppingBag,
  ShoppingBasket,
  SidebarClose,
  TicketSlash,
  UserCircle,
  Users,
} from 'lucide-angular';
import { AuthService } from '../../Authentication/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isSidebarOpen = false;

  // Icons
  readonly close = CircleX;
  readonly menu = Menu;
  readonly user = UserCircle;
  readonly calculator = Calculator;
  readonly pieChart = ChartPie;
  readonly users = Users;
  readonly fileText = FileText;
  readonly package = Package;
  readonly shopping = ShoppingBag;
  readonly ticket = TicketSlash;

  // Services
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly authservice = inject(AuthService);
  navigateTo(path: string) {
    this.router.navigate(['/home/' + path], {
      relativeTo: this.route,
    });
  }

  logOut() {
    this.authservice.logOut();
    this.router.navigate(['/login'], {
      relativeTo: this.route,
    });
  }
}
