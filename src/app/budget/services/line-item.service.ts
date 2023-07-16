import { Injectable } from '@angular/core';
import { budgetLineItems, lineItems } from '@model/data-store';
import { IBudgetLineItem } from '@model/interfaces/budget-line-item';
import { ILineItem } from '@model/interfaces/line-item';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor() { }

  getAll(): Observable<ILineItem[]> {
    return of(lineItems);
  }

  updateBudgetLineItem(lineItem: IBudgetLineItem): Observable<void> {
    const existing = budgetLineItems.find(li => li.Id === lineItem.Id);
    if (!existing) throwError(() => new Error('Line Item not found!'));
    Object.assign(existing!, lineItem);
    return of();
  }
}
