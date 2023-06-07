import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ITransaction } from '@model/interfaces/transaction';
import { TransactionSlugs } from '../slugs/transaction-slugs';
import { TransactionService } from '../../transactions/services/transaction.service';

export const transactionResolver: ResolveFn<ITransaction | null> = (route, state) => {
  if (route.routeConfig?.path === TransactionSlugs.new) return inject(TransactionService).getEmpty();
  const transactionId = route.paramMap.get(TransactionSlugs.transactionId);
  if (!transactionId) return null;
  return inject(TransactionService).getById(+transactionId);
};
