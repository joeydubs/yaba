import { Injectable } from '@angular/core';
import { transactions } from '@model/data-store';
import { ITransaction } from '@model/interfaces/transaction';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  newTransactions$ = new Subject<ITransaction>();

  constructor() { }

  addTransaction(transaction: ITransaction): void {
    transactions.push(transaction);
    this.newTransactions$.next(transaction);
  }

  getCurrentTransactions(): Observable<ITransaction[]> {
    return of(transactions);
  }

  getTransactionsFor(lineItemId: number): Observable<ITransaction[]> {
    return of(transactions.filter((t) => t.LineItemId === lineItemId));
  }
}
