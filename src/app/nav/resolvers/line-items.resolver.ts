import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ILineItem } from '@model/interfaces/line-item';
import { LineItemService } from 'src/app/budget/services/line-item.service';

export const lineItemsResolver: ResolveFn<ILineItem[]> = () => {
  return inject(LineItemService).getAll();
};
