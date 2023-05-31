import { ICategory } from "./category";
import { IEntity } from "./entity";
import { ILineItem } from "./line-item";

export interface ICategoryGroup extends IEntity {
    MonthlyBudgetId: number;
    Category: ICategory;
    LineItems: ILineItem[];
}