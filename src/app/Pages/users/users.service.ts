import { inject, Injectable } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable, of } from 'rxjs';
import { User } from '../../Shared/Classes/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly apiRequest = inject(ApiRequestService);

  getUserList(): Observable<User[]> {
    // return of(temp)
    return this.apiRequest.get('api/user/getuserlist');
  }

  updateStatus(userid: number, isactive: boolean) {
    return this.apiRequest.post(
      'api/user/updatestatus/' + userid + '/' + isactive,
      isactive
    );
  }
}
