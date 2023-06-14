import { Injectable } from '@angular/core';
import { accounts, startingBalances } from '@model/data-store';
import { IAccount } from '@model/interfaces/account';
import { IAccountBalance } from '@model/interfaces/account-balance';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  getAll(): Observable<IAccount[]> {
    return of(accounts.map((a) => ({...a})));
  }

  getStartingBalances(): Observable<IAccountBalance[]> {
    return of(startingBalances.map((cg) => JSON.parse(JSON.stringify(cg))));
  }
}
