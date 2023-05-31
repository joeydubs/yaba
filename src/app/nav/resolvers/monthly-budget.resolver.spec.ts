import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { monthlyBudgetResolver } from './monthly-budget.resolver';
import { IMonthlyBudget } from '@model/interfaces/monthly-budget';

describe('monthlyBudgetResolver', () => {
  const executeResolver: ResolveFn<IMonthlyBudget | null> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => monthlyBudgetResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
