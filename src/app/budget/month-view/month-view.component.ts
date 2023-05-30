import { Component, OnInit } from '@angular/core';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { Subscription, forkJoin } from 'rxjs';
import { IMonthlyBudget } from '@model/interfaces/monthly-budget';
import { IUpdatedTotals } from '@model/interfaces/updated-totals';
import { IAccountBalance } from '@model/interfaces/account-balance';
import { transactions } from '@model/data-store';
import { BudgetService } from '../services/budget.service';
import { TransactionService } from '../services/transaction.service';
import { ITransaction } from '@model/interfaces/transaction';
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
  monthlyBudget!: IMonthlyBudget;
  accountBalances: IAccountBalance[] = [];

  subscriptions = new Subscription();

  constructor(private budgetService: BudgetService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    forkJoin([this.budgetService.getMonthlyBudgetById(1), this.budgetService.getCategoryGroups(), this.transactionService.getAllTransactions()])
      .subscribe(([monthlyBudget, categoryGroups]) => {
        if (!monthlyBudget) return; // TODO: show some kind of error, nav to prev month, or create new month?
        this.monthlyBudget = monthlyBudget!;
        this.categoryGroups = categoryGroups;
        this.accountBalances = this.monthlyBudget.StartingBalances.map((sb): IAccountBalance => ({ Account: sb.Account, Amount: sb.Amount + transactions.reduce((sum, t) => sum + t.Amount, 0) }));

        this.subscriptions.add(this.transactionService.newTransactions$.subscribe((nt) => this.updateAccountTotals(nt)));
        this.calculateTotals();
      });
  }

  calculateTotals(): void {
    this.leftToPlan = this.categoryGroups.reduce((catSum, cg) => {
      const multiplier = cg.Category.ExpenseTypeId === ExpenseType.Income ? 1 : -1;
      return catSum + (multiplier * cg.LineItems.reduce((lineSum, li) => lineSum + li.Planned, 0));
    }, this.monthlyBudget.StartingBalances.reduce((sum, sb) => sum + sb.Amount, 0))

    this.leftToBudget = this.categoryGroups.reduce((catSum, cg) => {
      const multiplier = cg.Category.ExpenseTypeId === ExpenseType.Income ? 1 : -1;
      return catSum + (multiplier * cg.LineItems.reduce((lineSum, li) => lineSum + li.Actual, 0));
    }, this.monthlyBudget.StartingBalances.reduce((sum, sb) => sum + sb.Amount, 0))
  }

  updateTotals(totals: IUpdatedTotals): void {
    this.leftToPlan += totals.OffsetPlanned;
    this.leftToBudget += totals.OffsetActual;
  }

  updateAccountTotals(transaction: ITransaction): void {
    const accountBalance = this.accountBalances.find((ab) => ab.Account.Id === transaction.AccountId);
    if (!accountBalance) return; // TODO: maybe refetch accounts in case a new one was added?
    accountBalance.Amount += transaction.Amount;
  }
}
