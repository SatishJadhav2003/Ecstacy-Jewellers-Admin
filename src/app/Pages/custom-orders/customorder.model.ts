export class CustomOrderOverview {
    Order_ID:number=0;
    User_Name:string='';
    Order_Date:Date =new Date();
    Status:string ='';
    Amount:number=0;
    Mobile_Number:number=1234567890;
    Category_Name:string='';
    Remark:string='';
    Purity:string='';
    File_Path:string='';
    Email:string='';
}


export class Custom_Order_Status 
{
    Order_Status_ID:number=0;
    Order_ID:number =0;
    Status:string ="";
    Status_Timestamp:Date = new Date();
    Location:string ="";
}