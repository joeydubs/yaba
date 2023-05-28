import { Injectable } from '@angular/core';
import { Accounts } from '@model/enums/accounts.enum';
import { Categories } from '@model/enums/categories.enums';
import { IAccount } from '@model/interfaces/account';
import { ILineItem } from '@model/interfaces/line-item';
import { Observable, of } from 'rxjs';

const lineItems: ILineItem[] = [
  { Id: 1, AccountId: Accounts.WellsFargo, Name: 'Paycheck 1', Planned:2909.00, Actual: 0.00, CategoryId: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
  { Id: 1, AccountId: Accounts.WellsFargo, Name: 'Paycheck 2', Planned:2909.00, Actual: 0.00, CategoryId: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
  { Id: 1, AccountId: Accounts.WellsFargo, Name: 'Phones', Planned: 198.73, Actual: 198.73, CategoryId: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
  { Id: 1, AccountId: Accounts.WellsFargo, Name: 'Internet', Planned: 49.99, Actual: 49.99, CategoryId: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
  { Id: 1, AccountId: Accounts.WellsFargo, Name: 'Rent', Planned: 900.00, Actual: 900.00, CategoryId: Categories.Home, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
]

const accounts: IAccount[] = [
  { Id: 1, Name: 'Wells Fargo' }
]

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() { }

  getLineItems(): Observable<ILineItem[]> {
    return of(lineItems);
  }
}
