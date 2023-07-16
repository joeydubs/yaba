import { IAccount } from "./account";
import { IEntity } from "./entity";
import { ILineItem } from "./line-item";

export interface IBudgetLineItem extends IEntity {
    LineItemId: number;
    Planned: number;
    Actual: number;
    AccountId: number
    Allocated: boolean;
    CategoryId: number;
    MonthlyBudgetId: number

    Account: IAccount;
    LineItem: ILineItem;
}