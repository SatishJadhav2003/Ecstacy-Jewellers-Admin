export class OrderOverview {
    Order_ID:number=0;
    User_Name:string='';
    Order_Date:Date =new Date();
    Status:string ='';
    Amount:number=0;
}

export class Order_Item 
{
    Order_ID:number =0
    Order_Item_ID:number=0
    Product_ID:number=0
    Product_Name:string=''
    Product_Image:string=''
    Unit_Price:number=0
    Total_Price:number=0
    Quantity:number=0
    Shipping_Address:string=''
    Billing_Address:string=''
    Payment_Status:string =''
}


export class Order_Status 
{
    Order_Status_ID:number=0;
    Order_ID:number =0;
    Status:string ="";
    Status_Timestamp:Date = new Date();
    Location:string ="";
}