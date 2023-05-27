import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { ILineItem } from '@model/interfaces/line-item';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.less']
})
export class MonthViewComponent implements OnInit {
  leftToBudget = 0;
  lineItems: ILineItem[] = [];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.getLineItems().subscribe((lineItems) => { this.lineItems = lineItems; });
  }

}
