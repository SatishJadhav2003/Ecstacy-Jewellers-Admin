import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  readonly apiRequest = inject(ApiRequestService);

  getRevenueOverview() {
    return this.apiRequest.get('api/dashboard/GetRevenue');
  }
  getRevenueByMonth(): Observable<any[]> {
    return this.apiRequest.get('api/dashboard/GetRevenueByMonths');
  }
  GetRevenueByCategory(): Observable<any[]> {
    return this.apiRequest.get('api/dashboard/GetRevenueByCategory');
  }
  GetTopSellingProducts(): Observable<any[]> {
    return this.apiRequest.get('api/dashboard/GetTopSellingProducts');
  }
  GetLowStockProducts(): Observable<any[]> {
    return this.apiRequest.get('api/dashboard/GetLowStockProducts');
  }
}
