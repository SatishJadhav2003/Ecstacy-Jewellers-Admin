import { Injectable } from '@angular/core';
import { ApiRequestService } from '../Services/api-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiRequest: ApiRequestService) {}

  getToken(): string | null {
    return localStorage.getItem('Token');
  }

  loginByEmailPassword(data: any) {
    return this.apiRequest.post('api/user/login', data);
  }

  logOut() {
    localStorage.removeItem('User');
    localStorage.removeItem('User_ID');
    localStorage.removeItem('Token');
  }
  validateToken(): Observable<any> {
    const Temp = {
      Token: localStorage.getItem('Token'),
    };
    return this.apiRequest.post('api/user/validate-token', Temp);
  }
}
