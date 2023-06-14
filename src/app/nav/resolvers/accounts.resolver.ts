import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IAccount } from '@model/interfaces/account';
import { AccountService } from 'src/app/budget/services/account.service';

export const accountsResolver: ResolveFn<IAccount[]> = (route, state) => {
  return inject(AccountService).getAll();
};
