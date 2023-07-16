import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseType } from '@model/enums/expense-type.enum';
import { IAccount } from '@model/interfaces/account';
import { ITransaction } from '@model/interfaces/transaction';
import { Subscription } from 'rxjs';
import { BudgetService } from 'src/app/budget/services/budget.service';
import { TransactionService } from '../services/transaction.service';
import { ILineItem } from '@model/interfaces/line-item';

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.less']
})
export class TransactionDetailComponent implements OnInit {
    accounts: IAccount[];
    lineItems: ILineItem[];
    expenseType = ExpenseType;

    transaction!: ITransaction;
    form: FormGroup;

    subscriptions = new Subscription();
    categoryGroups: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private budgetService: BudgetService,
        private transactionService: TransactionService,
    ) {
        const { accounts, lineItems } = route.snapshot.data;
        this.accounts = accounts ?? [];
        this.lineItems = lineItems ?? []

        this.form = this.fb.group({
            LineItemId: this.fb.control(null),
            AccountId: this.fb.control(null, Validators.required),
            ExpenseTypeId: this.fb.control(null, Validators.required),
            Amount: this.fb.control(null, Validators.required),
            Date: this.fb.control(null, Validators.required),
            Notes: this.fb.control(''),
            IsCheck: this.fb.control(false),
            CheckNumber: this.fb.control(''),
        })
    }

    ngOnInit(): void {
        this.subscriptions.add(this.route.data.subscribe(({ transaction }) => {
            if (!transaction) this.router.navigate(['../']);
            this.transaction = transaction;
            this.form.reset(transaction);
        }));
    }

    save(): void {
        if (this.form.valid) {
            this.transactionService.addTransaction(this.form.value)
        }
    }

    dateSelected(date: string): void {
        this.budgetService.getCategoryGroupsForMonth(date).subscribe((cg) => {
            this.categoryGroups = cg;
            console.log(cg)
        })
    }
}
