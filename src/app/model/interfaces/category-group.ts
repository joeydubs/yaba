import { ICategory } from "./category";
import { ILineItem } from "./line-item";

export interface ICategoryGroup {
    Category: ICategory;
    LineItems: ILineItem[];
}