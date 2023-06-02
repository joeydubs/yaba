import { Component, Input, OnInit } from '@angular/core';
import { ExpenseType } from '@model/enums/expense-type.enum';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { ILineItem } from '@model/interfaces/line-item';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.less']
})
export class CategoryViewComponent implements OnInit {
  @Input() categoryGroup!: ICategoryGroup;

  isExpense: boolean = true;
  totalPlanned: number = 0;
  totalBudgeted: number = 0;

  get lineItems(): ILineItem[] {
    return this.categoryGroup.LineItems;
  }

  get currentPlanned(): number {
    return this.lineItems.reduce((sum, li) => sum + li.Planned, 0);
  }

  get currentBudgeted(): number {
    return this.lineItems.reduce((sum, li) => sum + li.Actual, 0);
  }

  get expenseMultiplier(): number {
    return this.categoryGroup.Category.ExpenseTypeId === ExpenseType.Income ? 1 : -1;
  }

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.isExpense = this.categoryGroup.Category.ExpenseTypeId === ExpenseType.Expense;
    this.totalPlanned = this.currentPlanned;
    this.totalBudgeted = this.currentBudgeted;
    this.updateTotals();
  }

  updateTotals(): void {
    const offsetPlanned = (this.currentPlanned - this.totalPlanned) * this.expenseMultiplier;
    const offsetActual = (this.currentBudgeted - this.totalBudgeted) * this.expenseMultiplier;
    this.totalPlanned = this.currentPlanned;
    this.totalBudgeted = this.currentBudgeted;
    this.budgetService.lineItemUpdated$.next({ OffsetPlanned: offsetPlanned, OffsetActual: offsetActual })
  }

  updateLineItem(lineItem: ILineItem): void {
    const index = this.lineItems.findIndex(li => li.Id === lineItem.Id);
    if (index === -1) this.lineItems.push(lineItem);
    else this.lineItems.splice(index, 1, lineItem);
    this.updateTotals();
  }
}
