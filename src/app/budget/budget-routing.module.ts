import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetSlugs } from '../nav/slugs/budget-slugs';
import { MonthViewComponent } from './month-view/month-view.component';

const routes: Routes = [
  { path: BudgetSlugs.root, component: MonthViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
