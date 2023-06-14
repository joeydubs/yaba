import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseType } from '@model/enums/expense-type.enum';
import { IAccount } from '@model/interfaces/account';
import { ITransaction } from '@model/interfaces/transaction';
import { Subscription } from 'rxjs';
import { BudgetService } from 'src/app/budget/services/budget.service';

@Component({
    selector: 'app-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.less']
})
export class TransactionDetailComponent implements OnInit {
    accounts: IAccount[];
    expenseType = ExpenseType;

    transaction!: ITransaction;
    form: FormGroup;

    subscriptions = new Subscription();
    categoryGroups: any;

    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private budgetService: BudgetService) {
        const { accounts } = route.snapshot.data;
        this.accounts = accounts ?? [];

        this.form = this.fb.group({
            LineItemId: this.fb.control(''),
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

    }

    dateSelected(date: string): void {
        this.budgetService.getCategoryGroupsForMonth(date).subscribe((cg) => {
            this.categoryGroups = cg;
            console.log(cg)
        })
    }
}
