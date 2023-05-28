import { Injectable } from '@angular/core';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { ILineItem } from '@model/interfaces/line-item';
import { Observable, of } from 'rxjs';
import { categoryGroups, lineItems, monthlyBudgets } from './data-store';
import { IMonthlyBudget } from '@model/interfaces/monthly-budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() { }

  getLineItems(): Observable<ILineItem[]> {
    return of(lineItems);
  }

  getCategoryGroups(): Observable<ICategoryGroup[]> {
    return of(categoryGroups);
  }

  getMonthlyBudgetById(id: number): Observable<IMonthlyBudget | undefined> {
    return of(monthlyBudgets.find((mb) => mb.Id === id));
  }
}
