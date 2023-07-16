import { Injectable } from '@angular/core';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { Observable, Subject, of, tap, BehaviorSubject } from 'rxjs';
import { categoryGroups, lineItems, monthlyBudgets } from '@model/data-store';
import { IMonthlyBudget } from '@model/interfaces/monthly-budget';
import { IUpdatedTotals } from '@model/interfaces/updated-totals';
import { IBudgetLineItem } from '@model/interfaces/budget-line-item';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  categoryGroupsForMonth$ = new BehaviorSubject<ICategoryGroup[]>([]);
  lineItemUpdated$ = new Subject<IUpdatedTotals>();

  constructor() { }

  getLineItems(): Observable<IBudgetLineItem[]> {
    return of(lineItems.map((li) => JSON.parse(JSON.stringify(li))));
  }

  getCategoryGroups(): Observable<ICategoryGroup[]> {
    return of(categoryGroups.map((cg) => JSON.parse(JSON.stringify(cg))));
  }

  getCategoryGroupsForBudget(id: number): Observable<ICategoryGroup[]> {
    return of(categoryGroups.filter((cg) => cg.MonthlyBudgetId === id).map((cg) => JSON.parse(JSON.stringify(cg)))).pipe(tap((cg) => this.categoryGroupsForMonth$.next(cg)));
  }
  
  getCategoryGroupsForMonth(date: string): Observable<ICategoryGroup[]> {
    const budgetId = monthlyBudgets.find((b) => b.Date.toString() === new Date(date).toString())?.Id;
    return of(categoryGroups.filter((cg) => cg.MonthlyBudgetId === budgetId).map((cg) => JSON.parse(JSON.stringify(cg))));
  }

  getMonthlyBudgetById(id: number): Observable<IMonthlyBudget | null> {
    return of(JSON.parse(JSON.stringify(monthlyBudgets.find((mb) => mb.Id === id))) || null);
  }
}
