import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILineItem } from '@model/interfaces/line-item';
import { Subscription } from 'rxjs';
import { ITransaction } from '@model/interfaces/transaction';
import { TransactionService } from '../../transactions/services/transaction.service';
import { LineItemService } from '../services/line-item.service';
import { ExpenseType } from '@model/enums/expense-type.enum';
import { transactions } from '@model/data-store';

@Component({
  selector: 'app-line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.less']
})
export class LineItemComponent implements OnInit {
  @Input() lineItem!: ILineItem;
  @Input() isExpense: boolean = true;
  @Output() onLineItemChange = new EventEmitter<ILineItem>();

  lineItemClone?: ILineItem;
  isEditing = false;
  transactions: ITransaction[] = [];
  remaining: number = 0;

  subscriptions = new Subscription();

  get allocated(): boolean {
    return this.lineItem.Allocated;
  }

  constructor(private transactionService: TransactionService, private lineItemService: LineItemService) { }

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

    this.lineItemService.updateLineItem(this.lineItem).subscribe();
    this.onLineItemChange.emit(this.lineItem);
  }

  updateRemainingBy(amount: number): void {
    if (this.isExpense) {
      this.remaining += amount;
    } else {
      // this.lineItem.Actual += amount;
    }
  }

  edit(): void {
    this.lineItemClone = { ...this.lineItem };
    this.isEditing = true;
  }

  cancel(): void {
    this.isEditing = false;
  }

  save(): void {
    const transactionAmount = this.lineItemClone!.Actual - this.lineItem.Actual;
    this.lineItemService.updateLineItem(this.lineItemClone!).subscribe();
    this.lineItem = this.lineItemClone!;

    // Temp solution until transaction logic is added
    if (!this.isExpense) this.transactionService.addTransaction({ Id: transactions.length, LineItemId: this.lineItem.Id, AccountId: this.lineItem.AccountId, Account: this.lineItem.Account, ExpenseTypeId: ExpenseType.Income, Amount: transactionAmount, Date: new Date(), IsCheck: false })

    this.onLineItemChange.emit(this.lineItem);
    this.isEditing = false;
  }
}
