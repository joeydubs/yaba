import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionDetailComponent } from '../transactions/transaction-detail/transaction-detail.component';
import { transactionResolver } from '../nav/resolvers/transaction.resolver';
import { TransactionSlugs } from '../nav/slugs/transaction-slugs';
import { TransactionHeaderComponent } from './transaction-header/transaction-header.component';

const routes: Routes = [
    {
        path: `${TransactionSlugs.root}`, component: TransactionHeaderComponent, children: [
            { path: `${TransactionSlugs.new}`, component: TransactionDetailComponent, resolve: { transaction: transactionResolver } },
            { path: `:${TransactionSlugs.transactionId}`, component: TransactionDetailComponent, resolve: { transaction: transactionResolver } },
            { path: '', pathMatch: 'full', redirectTo: '1' /* create list page */ },
            { path: '**', redirectTo: '' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule { }
