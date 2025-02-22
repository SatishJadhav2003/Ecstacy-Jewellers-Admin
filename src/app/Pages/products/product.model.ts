export class ProductOverview {
  Product_ID!: number;
  Product_Name!: string;
  Price!: number;
  Making_charges!: number;
  Stock_Quantity!: number;
  Is_Active: boolean = false;
}

export class SaveProduct {
  Product_ID:number= 0;
  Product_Name: string = '';
  Description: string = '';
  Price: number = 0;
  Weight: number = 0;
  Stock_Quantity: number = 0;
  Category_ID: number = 0;
  Metal_ID: number = 0;
}
