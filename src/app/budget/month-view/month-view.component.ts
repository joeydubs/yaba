import { Component, OnInit } from '@angular/core';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { Subscription, forkJoin } from 'rxjs';
import { IMonthlyBudget } from '@model/interfaces/monthly-budget';
import { IAccountBalance } from '@model/interfaces/account-balance';
import { BudgetService } from '../services/budget.service';
import { TransactionService } from '../../transactions/services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetSlugs } from 'src/app/nav/slugs/budget-slugs';

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

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data
      .subscribe(({monthlyBudget, categoryGroups}) => {
        if (!monthlyBudget) this.router.navigate([BudgetSlugs.root, '1']); // TODO: show some kind of error, nav to prev month, or create new month?
        this.monthlyBudget = monthlyBudget!;
        this.categoryGroups = categoryGroups;
      });
  }

  nextMonth(): void {
    this.router.navigate([BudgetSlugs.root, this.monthlyBudget.Id + 1]);
  }

  prevMonth(): void {
    this.router.navigate([BudgetSlugs.root, this.monthlyBudget.Id - 1]);
  }
}
