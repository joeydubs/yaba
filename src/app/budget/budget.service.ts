import { Injectable } from '@angular/core';
import { Accounts } from '@model/enums/accounts.enum';
import { Categories } from '@model/enums/categories.enums';
import { IAccount } from '@model/interfaces/account';
import { ILineItem } from '@model/interfaces/line-item';
import { Observable, of } from 'rxjs';

const lineItems: ILineItem[] = [
  { Id: 1, AccountId: Accounts.WellsFargo, Name: 'Phones', Amount: 198.73, Category: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
  { Id: 1, AccountId: Accounts.WellsFargo, Name: 'Internet', Amount: 49.99, Category: Categories.Personal, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
  { Id: 1, AccountId: Accounts.WellsFargo, Name: 'Rent', Amount: 900.00, Category: Categories.Home, Allocated: false, Account: { Id: 1, Name: 'Wells Fargo' } },
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
