import { IEntity } from "./entity";
import { IStartingBalance } from "./starting-balance";

export interface IMonthlyBudget extends IEntity {
    Date: Date;
    StartingBalances: IStartingBalance[];
}