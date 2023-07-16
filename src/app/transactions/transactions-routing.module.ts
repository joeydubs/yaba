import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDetailComponent } from '../transactions/transaction-detail/transaction-detail.component';
import { transactionResolver } from '../nav/resolvers/transaction.resolver';
import { TransactionSlugs } from '../nav/slugs/transaction-slugs';
import { TransactionHeaderComponent } from './transaction-header/transaction-header.component';
import { accountsResolver } from '../nav/resolvers/accounts.resolver';
import { lineItemsResolver } from '../nav/resolvers/line-items.resolver';

const transactionDetailData = {
    transaction: transactionResolver,
    accounts: accountsResolver,
    lineItems: lineItemsResolver,
}

const routes: Routes = [
    {
        path: `${TransactionSlugs.root}`, component: TransactionHeaderComponent, children: [
            { path: `${TransactionSlugs.new}`, component: TransactionDetailComponent, resolve: transactionDetailData },
            { path: `:${TransactionSlugs.transactionId}`, component: TransactionDetailComponent, resolve: transactionDetailData },
            { path: '', pathMatch: 'full', redirectTo: 'new' /* create list page */ },
            { path: '**', redirectTo: '' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule { }
