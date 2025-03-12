import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  LucideAngularModule,
  Package,
  Wallet,
  Truck,
  PackageX,
  ChartBar,
  ShoppingCart,
  MoreVertical,
} from 'lucide-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CountUpModule } from 'ngx-countup';
import { MnDropdownComponent } from '../../Directives/dropdown';
import { DashboardService } from './dashboard.service';
import { imageUrl } from '../../app.config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LucideAngularModule,
    CountUpModule,
    CommonModule,
    NgApexchartsModule,
    MnDropdownComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  readonly wallet = Wallet;
  readonly Package = Package;
  readonly Truck = Truck;
  readonly PackageX = PackageX;
  readonly barchart = ChartBar;
  readonly cart = ShoppingCart;
  readonly verticalMenu = MoreVertical;
  // charts
  salesRevenueOverview: any;
  revenueByCategory: any;

  // Services
  readonly dashboard = inject(DashboardService);

  // varibles
  revenueOverview: any;
  totalSaveInMonthlyChart: number = 0;
  currentYear: number = new Date().getFullYear();
  topSellingProducts: any[] = [];
  lowStockProducts: any[] = [];
  ngOnInit() {
    this.getRevenueOverview();
    this.getRevenueByMonth();
    this.getRevenueByCategory();
    this.getTopSellingProducts();
    this.getLowStockProducts();
  }

  getRevenueOverview() {
    this.dashboard.getRevenueOverview().subscribe((data: any) => {
      this.revenueOverview = data[0];
      console.log(data);
    });
  }

  getRevenueByCategory() {
    this.dashboard.GetRevenueByCategory().subscribe((data: any) => {
      console.log(data);
      this.revenueByCategory = {
        series: data.map((d: any) => d.Category_Revenue),
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: data.map((d: any) => d.Category_Name),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      };
    });
  }

  getRevenueByMonth() {
    this.dashboard.getRevenueByMonth().subscribe((data) => {
      this.totalSaveInMonthlyChart = data
        .map((d) => d.Total_Revenue)
        .reduce((acc, curr) => acc + curr, 0);

      this.salesRevenueOverview = {
        series: [
          {
            name: 'Total Sales',
            data: data.map((d) => d.Total_Revenue),
          },
        ],
        chart: {
          type: 'bar',
          height: 300,
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: data.map((d) => d.Month_Name),
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return '₹' + val + '';
            },
          },
        },
        grid: {
          show: true,
          padding: {
            top: -20,
            right: -10,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
          },
        },
        colors: ['#3b82f6'],
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'bottom',
        },
      };
    });
  }

  getTopSellingProducts() {
    this.dashboard.GetTopSellingProducts().subscribe((data) => {
      console.log(data);
      this.topSellingProducts = data;
    });
  }

  getLowStockProducts() {
    this.dashboard.GetLowStockProducts().subscribe((data) => {
      console.log(data);
      this.lowStockProducts = data;
    });
  }

  getImage(path: string): string {
    return `${imageUrl}/api/product/images/${path}?height=90&width=96`;
  }
}
