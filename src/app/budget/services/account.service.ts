import { Injectable } from '@angular/core';
import { startingBalances } from '@model/data-store';
import { IAccountBalance } from '@model/interfaces/account-balance';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  getStartingBalances(): Observable<IAccountBalance[]> {
    return of(startingBalances.map((cg) => JSON.parse(JSON.stringify(cg))));
  }
}
