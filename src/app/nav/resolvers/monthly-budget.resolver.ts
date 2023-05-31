import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { BudgetService } from 'src/app/budget/services/budget.service';
import { BudgetSlugs } from '../slugs/budget-slugs';
import { IMonthlyBudget } from '@model/interfaces/monthly-budget';

export const monthlyBudgetResolver: ResolveFn<IMonthlyBudget | null> = (route, state) => {
  const budgetId = route.paramMap.get(BudgetSlugs.budgetId);
  if (!budgetId) return null;
  return inject(BudgetService).getMonthlyBudgetById(+budgetId);
};
