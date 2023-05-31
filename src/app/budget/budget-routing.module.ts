import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetSlugs } from '../nav/slugs/budget-slugs';
import { MonthViewComponent } from './month-view/month-view.component';
import { BudgetTotalsComponent } from './budget-totals/budget-totals.component';
import { monthlyBudgetResolver } from '../nav/resolvers/monthly-budget.resolver';
import { categoryGroupsForMonthResolver } from '../nav/resolvers/category-groups-for-month.resolver';

const routes: Routes = [
  {
    path: BudgetSlugs.root, component: BudgetTotalsComponent, children: [
      { path: `:${BudgetSlugs.budgetId}`, component: MonthViewComponent, resolve: { monthlyBudget: monthlyBudgetResolver, categoryGroups: categoryGroupsForMonthResolver } },
      { path: '', pathMatch: 'full', redirectTo: '1' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
