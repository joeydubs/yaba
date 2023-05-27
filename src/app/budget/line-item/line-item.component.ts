import { Component, Input } from '@angular/core';
import { ILineItem } from '@model/interfaces/line-item';

@Component({
  selector: 'app-line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.less']
})
export class LineItemComponent {
  @Input() lineItem!: ILineItem;

  toggleAllocated(): void {
    this.lineItem.Allocated = !this.lineItem.Allocated;
  }
}
