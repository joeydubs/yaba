import { Component } from "@angular/core";

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html'
})
export class NavComponent {
    links = [
        { name: 'Budget', route: ['budget'] },
        { name: 'Transactions', route: ['transactions'] },
    ];
}