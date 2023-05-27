import { Accounts } from "../enums/accounts.enum";
import { Categories } from "../enums/categories.enums";
import { IAccount } from "./account";

export interface ILineItem {
    Id: number;
    Name: string;
    Amount: number;
    AccountId: number
    Account: IAccount;
    Allocated: boolean;
    Category: Categories;
}