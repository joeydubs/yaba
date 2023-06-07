import { Injectable } from '@angular/core';
import { transactions } from '@model/data-store';
import { ITransaction } from '@model/interfaces/transaction';
import { Observable, Subject, of } from 'rxjs';

const emptyTransaction: ITransaction = {
  Id: 0,
  AccountId: 0,
  ExpenseTypeId: 0,
  Amount: 0,
  Date: new Date(),
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  newTransactions$ = new Subject<ITransaction>();

  constructor() { }

  getEmpty(): ITransaction {
    return { ...emptyTransaction };
  }

  getById(id: number): Observable<ITransaction | null> {
    return of(transactions.find((t) => t.Id === id) ?? null);
  }

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
