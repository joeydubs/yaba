import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILineItem } from '@model/interfaces/line-item';

@Component({
  selector: 'app-line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.less']
})
export class LineItemComponent {
  @Input() lineItem!: ILineItem;
  @Input() showAllocation: boolean = true;
  @Output() onAllocation = new EventEmitter<void>();

  get allocated(): boolean {
    return this.lineItem.Allocated;
  }

  toggleAllocated(): void {
    this.lineItem.Allocated = !this.lineItem.Allocated;

    if (this.allocated) {
      this.lineItem.Actual = this.lineItem.Planned;
    } else {
      this.lineItem.Actual = 0;
    }

    this.onAllocation.emit();
  }
}
