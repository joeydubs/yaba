import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionHeaderComponent } from './transaction-header/transaction-header.component';
import { TransactionRoutingModule } from './transactions-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TransactionDetailComponent,
    TransactionHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransactionRoutingModule,
  ],
  providers: [
    DatePipe
  ]
})
export class TransactionsModule { }
