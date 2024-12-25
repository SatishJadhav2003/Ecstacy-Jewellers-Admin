import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule,  UserCircle } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule,LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen = false;
  readonly user = UserCircle
  readonly router = inject(Router)
  readonly route = inject(ActivatedRoute);
    navigateTo(path: string) {
      this.router.navigate(['/home/' + path],{
        relativeTo:this.route
      })
    }
}
