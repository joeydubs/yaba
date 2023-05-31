import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { MonthViewComponent } from './month-view/month-view.component';
import { LineItemComponent } from './line-item/line-item.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { BudgetTotalsComponent } from './budget-totals/budget-totals.component';


@NgModule({
  declarations: [
    MonthViewComponent,
    LineItemComponent,
    CategoryViewComponent,
    BudgetTotalsComponent
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
