import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Package, Wallet,Truck, PackageX, ChartBar } from 'lucide-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LucideAngularModule,CountUpModule,CommonModule,NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
readonly wallet = Wallet;
readonly Package = Package;
readonly Truck = Truck;
readonly PackageX = PackageX;
readonly barchart = ChartBar
// charts
salesRevenueOverview: any;

ngOnInit()
{
  this.salesRevenueOverview = {
    series: [{
        name: 'Total Sales',
        data: [44, 55, 41, 67, 22, 43, 21, 49, 20, 41, 67, 22,]
    }],
    chart: {
        type: 'bar',
        height: 300,
        stacked: true,
        toolbar: {
            show: false,
        },
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    tooltip: {
        y: {
            formatter: function (val: any) {
                return "$" + val + "k"
            }
        }
    },
    grid: {
        show: true,
        padding: {
            top: -20,
            right: -10,
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '50%',
        },
    },
    colors: '#3b82f6',
    fill: {
        opacity: 1
    },
    legend: {
        position: 'bottom',
    },
}
}
}
