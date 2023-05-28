import { IAccount } from "./account";

export interface IStartingBalance {
    AccountId: number;
    MonthlyBudgetId: number;
    Account: IAccount;
    Amount: number;
}