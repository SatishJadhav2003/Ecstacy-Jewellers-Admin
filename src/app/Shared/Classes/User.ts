export class User {
    User_ID: number = 0;
    First_Name: string = '';
    Last_Name: string = '';
    Email: string = '';
    Phone_Number!: number;
    Last_Login: Date = new Date();
    Is_Active: boolean = true;

}