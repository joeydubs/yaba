import { Component } from '@angular/core';
import { ExpenseType } from '@model/enums/expense-type.enum';
import { IAccountBalance } from '@model/interfaces/account-balance';
import { IUpdatedTotals } from '@model/interfaces/updated-totals';
import { Subscription, forkJoin } from 'rxjs';
import { BudgetService } from '../services/budget.service';
import { TransactionService } from '../services/transaction.service';
import { ITransaction } from '@model/interfaces/transaction';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-budget-totals',
  templateUrl: './budget-totals.component.html',
  styleUrls: ['./budget-totals.component.less']
})
export class BudgetTotalsComponent {
  accountBalances: IAccountBalance[] = [];
  leftToPlan = 0;
  leftToBudget = 0;

  categoryGroups: ICategoryGroup[] = [];
  startingBalances: IAccountBalance[] = [];
  transactions: ITransaction[] = [];

  subscriptions = new Subscription();

  constructor(private budgetService: BudgetService, private accountService: AccountService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    forkJoin([this.budgetService.getCategoryGroups(), this.accountService.getStartingBalances(), this.transactionService.getCurrentTransactions()])
      .subscribe(([categoryGroups, startingBalances, transactions]) => {
        this.categoryGroups = categoryGroups;
        this.startingBalances = startingBalances;
        this.transactions = transactions;
        this.accountBalances = this.startingBalances.map((sb): IAccountBalance => ({ Account: sb.Account, Amount: sb.Amount + transactions.reduce((sum, t) => t.AccountId === sb.Account.Id ? sum + t.Amount : sum, 0) }));

        this.calculateTotals();

        this.subscriptions.add(this.transactionService.newTransactions$.subscribe((nt) => this.updateAccountTotals(nt)));
        this.subscriptions.add(this.budgetService.lineItemBudgeted$.subscribe((ut) => this.updateBudgetTotals(ut)));
      });
  }

  calculateTotals(): void {
    this.leftToPlan = this.categoryGroups.reduce((catSum, cg) => {
      const multiplier = cg.Category.ExpenseTypeId === ExpenseType.Income ? 1 : -1;
      return catSum + (multiplier * cg.LineItems.reduce((lineSum, li) => lineSum + li.Planned, 0));
    }, this.startingBalances.reduce((sum, sb) => sum + sb.Amount, 0))

    this.leftToBudget = this.categoryGroups.reduce((catSum, cg) => {
      const multiplier = cg.Category.ExpenseTypeId === ExpenseType.Income ? 1 : -1;
      return catSum + (multiplier * cg.LineItems.reduce((lineSum, li) => lineSum + li.Actual, 0));
    }, this.startingBalances.reduce((sum, sb) => sum + sb.Amount, 0))
  }

  updateBudgetTotals(totals: IUpdatedTotals): void {
    this.leftToPlan += totals.OffsetPlanned;
    this.leftToBudget += totals.OffsetActual;
  }

  updateAccountTotals(transaction: ITransaction): void {
    const accountBalance = this.accountBalances.find((ab) => ab.Account.Id === transaction.AccountId);
    if (!accountBalance) return; // TODO: maybe refetch accounts in case a new one was added?
    accountBalance.Amount += transaction.Amount;
  }
}