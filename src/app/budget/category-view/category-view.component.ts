import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpenseType } from '@model/enums/expense-type.enum';
import { ICategoryGroup } from '@model/interfaces/category-group';
import { ILineItem } from '@model/interfaces/line-item';
import { IUpdatedTotals } from '@model/interfaces/updated-totals';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.less']
})
export class CategoryViewComponent implements OnInit {
  @Input() categoryGroup!: ICategoryGroup;
  @Output() onTotalsUpdated = new EventEmitter<IUpdatedTotals>();

  showAllocation: boolean = true;
  totalPlanned: number = 0;
  totalBudgeted: number = 0;

  get currentPlanned(): number {
    return this.lineItems.reduce((sum, li) => sum + li.Planned, 0);
  }

  get currentBudgeted(): number {
    return this.lineItems.reduce((sum, li) => sum + li.Actual, 0);
  }

  get lineItems(): ILineItem[] {
    return this.categoryGroup.LineItems;
  }

  get expenseMultiplier(): number {
    return this.categoryGroup.Category.ExpenseTypeId === ExpenseType.Income ? 1 : -1;
  }

  ngOnInit(): void {
    if (this.categoryGroup.Category.ExpenseTypeId === ExpenseType.Income) {
      this.showAllocation = false;
    }
    this.totalPlanned = this.currentPlanned;
    this.totalBudgeted = this.currentBudgeted;
    this.updateTotals();
  }

  updateTotals(): void {
    const offsetPlanned = (this.currentPlanned - this.totalPlanned) * this.expenseMultiplier;
    const offsetActual = (this.currentBudgeted - this.totalBudgeted) * this.expenseMultiplier;
    this.onTotalsUpdated.emit({ OffsetPlanned: offsetPlanned, OffsetActual: offsetActual })
    this.totalPlanned = this.currentPlanned;
    this.totalBudgeted = this.currentBudgeted;
  }

  allocationUpdated(): void {
    this.updateTotals();
  }
}
