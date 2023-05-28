import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { forkJoin } from 'rxjs';
import { IMonthlyBudget } from '@model/interfaces/monthly-budget';
import { IUpdatedTotals } from '@model/interfaces/updated-totals';
import { ExpenseType } from '@model/enums/expense-type.enum';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.less']
})
export class MonthViewComponent implements OnInit {
  leftToPlan = 0;
  leftToBudget = 0;
  categoryGroups: ICategoryGroup[] = [];
  monthlyBudget: IMonthlyBudget | undefined;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    forkJoin([this.budgetService.getMonthlyBudgetById(1), this.budgetService.getCategoryGroups()])
      .subscribe(([monthlyBudget, categoryGroups]) => {
        this.monthlyBudget = monthlyBudget;
        this.categoryGroups = categoryGroups;

        this.calculateTotals();
      });
  }

  calculateTotals(): void {
    this.leftToPlan = this.categoryGroups.reduce((catSum, cg) => {
      const multiplier = cg.Category.ExpenseTypeId === ExpenseType.Income ? 1 : -1;
      return catSum + (multiplier * cg.LineItems.reduce((lineSum, li) => lineSum + li.Planned, 0));
    }, this.monthlyBudget!.StartingBalances.reduce((sum, sb) => sum + sb.Amount, 0))

    this.leftToBudget = this.categoryGroups.reduce((catSum, cg) => {
      const multiplier = cg.Category.ExpenseTypeId === ExpenseType.Income ? 1 : -1;
      return catSum + (multiplier * cg.LineItems.reduce((lineSum, li) => lineSum + li.Actual, 0));
    }, this.monthlyBudget!.StartingBalances.reduce((sum, sb) => sum + sb.Amount, 0))
  }

  updateTotals(totals: IUpdatedTotals): void {
    this.leftToPlan += totals.OffsetPlanned;
    this.leftToBudget += totals.OffsetActual;
  }
}
