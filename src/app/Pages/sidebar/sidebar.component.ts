import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Calculator, ChartPie, CircleX, FileText, LucideAngularModule,    Menu,    SidebarClose,    UserCircle, Users } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule,LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen = false;

  // Icons
  readonly close = CircleX
  readonly menu = Menu;
  readonly user = UserCircle
  readonly calculator = Calculator;
  readonly pieChart = ChartPie;
  readonly users = Users;
  readonly fileText = FileText;

  // Services
  readonly router = inject(Router)
  readonly route = inject(ActivatedRoute);
    navigateTo(path: string) {
      this.router.navigate(['/home/' + path],{
        relativeTo:this.route
      })
    }
}
