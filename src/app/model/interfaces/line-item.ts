import { Categories } from "../enums/categories.enums";
import { IAccount } from "./account";
import { IEntity } from "./entity";

export interface ILineItem extends IEntity {
    Name: string;
    Planned: number;
    Actual: number;
    AccountId: number
    Account: IAccount;
    Allocated: boolean;
    CategoryId: Categories;
}