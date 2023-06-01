import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILineItem } from '@model/interfaces/line-item';
import { Subscription } from 'rxjs';
import { ITransaction } from '@model/interfaces/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.less']
})
export class LineItemComponent implements OnInit {
  @Input() lineItem!: ILineItem;
  @Input() isExpense: boolean = true;
  @Output() onAllocation = new EventEmitter<void>();

  isEditing = false;
  transactions: ITransaction[] = [];
  remaining: number = 0;

  subscriptions = new Subscription();

  get allocated(): boolean {
    return this.lineItem.Allocated;
  }

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getCurrentTransactions().subscribe(
      (transactions) => {
        if (this.isExpense) {
          this.updateRemainingBy(this.lineItem.Actual + transactions.reduce((sum, t) => t.LineItemId === this.lineItem.Id ? sum + t.Amount : sum, 0))
        }
      }
    );
    this.subscriptions.add(
      this.transactionService.newTransactions$.subscribe((nt) => { if (nt.LineItemId === this.lineItem.Id) this.updateRemainingBy(nt.Amount); })
    );
  }

  toggleAllocated(): void {
    this.lineItem.Allocated = !this.lineItem.Allocated;
    const amount = (this.allocated ? 1 : -1) * this.lineItem.Planned;

    this.lineItem.Actual += amount;
    this.updateRemainingBy(amount);

    this.onAllocation.emit();
  }

  updateRemainingBy(amount: number): void {
    if (this.isExpense) {
      this.remaining += amount;
    } else {
      this.lineItem.Actual += amount;
    }
  }
}
