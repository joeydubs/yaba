import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { transactionResolver } from './transaction.resolver';
import { ITransaction } from '@model/interfaces/transaction';

describe('transactionResolver', () => {
  const executeResolver: ResolveFn<ITransaction | null> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => transactionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
