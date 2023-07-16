import { ICategory } from "./category";
import { IEntity } from "./entity";
import { IBudgetLineItem } from "./budget-line-item";

export interface ICategoryGroup extends IEntity {
    MonthlyBudgetId: number;
    Category: ICategory;
    LineItems: IBudgetLineItem[];
}