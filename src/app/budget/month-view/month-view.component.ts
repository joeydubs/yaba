import { Component, OnInit } from '@angular/core';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { Subscription, forkJoin } from 'rxjs';
import { IMonthlyBudget } from '@model/interfaces/monthly-budget';
import { IAccountBalance } from '@model/interfaces/account-balance';
import { BudgetService } from '../services/budget.service';
import { TransactionService } from '../services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';

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
        if (!monthlyBudget) this.router.navigate(['../', '1']); // TODO: show some kind of error, nav to prev month, or create new month?
        this.monthlyBudget = monthlyBudget!;
        this.categoryGroups = categoryGroups;
      });
  }
}
