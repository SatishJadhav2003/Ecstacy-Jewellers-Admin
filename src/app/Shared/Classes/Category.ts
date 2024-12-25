import { SubCategory } from "./SubCategories";


export class Category
{
    Category_ID!:number;
    Category_Name!:string;
    Category_Image!:string;
    Is_Active!:boolean;
    Is_Feature!:boolean;
    SubCategories?:SubCategory[]
}