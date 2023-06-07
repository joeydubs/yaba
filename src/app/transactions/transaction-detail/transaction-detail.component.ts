import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransaction } from '@model/interfaces/transaction';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.less']
})
export class TransactionDetailComponent implements OnInit {
  transaction: ITransaction | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(({transaction}) => {
      if (!transaction) this.router.navigate(['../']);
      this.transaction = transaction;
    })
  }

}
