import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionHeaderComponent } from './transaction-header/transaction-header.component';
import { TransactionRoutingModule } from './transactions-routing.module';

@NgModule({
  declarations: [
    TransactionDetailComponent,
    TransactionHeaderComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
  ]
})
export class TransactionsModule { }
