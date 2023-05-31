import { ResolveFn } from '@angular/router';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { BudgetSlugs } from '../slugs/budget-slugs';
import { inject } from '@angular/core';
import { BudgetService } from 'src/app/budget/services/budget.service';

export const categoryGroupsForMonthResolver: ResolveFn<ICategoryGroup[] | null> = (route, state) => {
  const budgetId = route.paramMap.get(BudgetSlugs.budgetId);
  if (!budgetId) return null;
  return inject(BudgetService).getCategoryGroupsForBudget(+budgetId);
};
