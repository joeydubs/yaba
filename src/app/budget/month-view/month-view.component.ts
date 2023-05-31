import { Component, OnInit } from '@angular/core';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { Subscription, forkJoin } from 'rxjs';
import { IMonthlyBudget } from '@model/interfaces/monthly-budget';
import { IAccountBalance } from '@model/interfaces/account-balance';
import { BudgetService } from '../services/budget.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.less']
})
export class MonthViewComponent implements OnInit {
  categoryGroups: ICategoryGroup[] = [];
  monthlyBudget!: IMonthlyBudget;
  accountBalances: IAccountBalance[] = [];

  subscriptions = new Subscription();

  constructor(private budgetService: BudgetService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    forkJoin([this.budgetService.getMonthlyBudgetById(1), this.budgetService.getCategoryGroups()])
      .subscribe(([monthlyBudget, categoryGroups]) => {
        if (!monthlyBudget) return; // TODO: show some kind of error, nav to prev month, or create new month?
        this.monthlyBudget = monthlyBudget!;
        this.categoryGroups = categoryGroups;
      });
  }
}
