import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { MonthViewComponent } from './month-view/month-view.component';
import { LineItemComponent } from './line-item/line-item.component';


@NgModule({
  declarations: [
    MonthViewComponent,
    LineItemComponent
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
