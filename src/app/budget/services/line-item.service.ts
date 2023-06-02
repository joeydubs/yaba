import { Injectable } from '@angular/core';
import { lineItems } from '@model/data-store';
import { ILineItem } from '@model/interfaces/line-item';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor() { }

  updateLineItem(lineItem: ILineItem): Observable<void> {
    const existing = lineItems.find(li => li.Id === lineItem.Id);
    if (!existing) throwError(() => new Error('Line Item not found!'));
    Object.assign(existing!, lineItem);
    return of();
  }
}
