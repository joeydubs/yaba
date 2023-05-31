import { Injectable } from '@angular/core';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { ILineItem } from '@model/interfaces/line-item';
import { Observable, Subject, of } from 'rxjs';
import { categoryGroups, lineItems, monthlyBudgets } from '@model/data-store';
import { IMonthlyBudget } from '@model/interfaces/monthly-budget';
import { IUpdatedTotals } from '@model/interfaces/updated-totals';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  lineItemBudgeted$ = new Subject<IUpdatedTotals>()

  constructor() { }

  getLineItems(): Observable<ILineItem[]> {
    return of(lineItems);
  }

  getCategoryGroups(): Observable<ICategoryGroup[]> {
    return of(categoryGroups);
  }

  getCategoryGroupsForBudget(id: number): Observable<ICategoryGroup[]> {
    return of(categoryGroups.filter((cg) => cg.MonthlyBudgetId === id));
  }

  getMonthlyBudgetById(id: number): Observable<IMonthlyBudget | null> {
    return of(monthlyBudgets.find((mb) => mb.Id === id) || null);
  }
}
