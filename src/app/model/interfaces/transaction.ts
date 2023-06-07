import { IAccount } from "./account";
import { IEntity } from "./entity";

export interface ITransaction extends IEntity {
    LineItemId?: number;
    Account?: IAccount;
    AccountId: number;
    ExpenseTypeId: number;
    Amount: number;
    Date: Date;
    Notes?: string;
    IsCheck?: boolean;
    CheckNumber?: number;
}