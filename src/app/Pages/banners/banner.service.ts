import { Injectable, inject } from '@angular/core';
import { Banner } from '../../Shared/Classes/Banner';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../../Services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
readonly apiRequest = inject(ApiRequestService)

  getAllBanners(): Observable<Banner[]> {
    return this.apiRequest.get('api/banner/GetAllBanners');
  }

  deleteBanner(ID: Number): Observable<boolean> {
    return this.apiRequest.delete('api/banner/' + ID);
  }

  removeImage(ID:number, Image_Name: string): Observable<any> {
    const encodedFileName = encodeURIComponent(Image_Name);
    return this.apiRequest.delete('api/banner/delete/'+ID+'/'+encodedFileName);
  }

  addBanner(BannerName: string, BannerImage: any): Observable<any> {
    const formData = new FormData();
    formData.append('BannerName', BannerName);
    formData.append('BannerImage', BannerImage);
    console.log(
      'FormData:',
      formData.get('BannerName'),
      formData.get('BannerImage')
    );

    return this.apiRequest.postImage('api/banner/add', formData);
  }
}
