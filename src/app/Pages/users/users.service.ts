import { inject, Injectable } from "@angular/core";
import { ApiRequestService } from "../../Services/api-request.service";
import { Observable, of } from "rxjs";
import { User } from "../../Shared/Classes/User";

@Injectable({
    providedIn: "root"
})
export class UsersService {
    readonly apiRequest = inject(ApiRequestService);


    getUserList(): Observable<User[]> {
        const temp: User[] = [
            {
                User_ID: 1,
                First_Name: "Satish",
                Last_Name: "Jadhav",
                Email: "satish@gmail.com",
                Phone_Number: 839061529,
                Last_Login: new Date(),
                Is_Active: true
            },
            {
                User_ID: 2,
                First_Name: "Tejas",
                Last_Name: "Kulkarni",
                Email: "tejas@gmail.com",
                Phone_Number: 839061529,
                Last_Login: new Date(-1),
                Is_Active: true
            }
        ];
        return of(temp)
    }
}