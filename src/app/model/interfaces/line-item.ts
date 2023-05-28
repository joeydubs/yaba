import { Accounts } from "../enums/accounts.enum";
import { Categories } from "../enums/categories.enums";
import { IAccount } from "./account";

export interface ILineItem {
    Id: number;
    Name: string;
    Planned: number;
    Actual: number;
    AccountId: number
    Account: IAccount;
    Allocated: boolean;
    CategoryId: Categories;
}