import { ExpenseType } from "@model/enums/expense-type.enum";
import { IEntity } from "./entity";

export interface ICategory extends IEntity {
    Name: string
    ExpenseTypeId: ExpenseType
}