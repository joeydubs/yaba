import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTotalsComponent } from './budget-totals.component';

describe('BudgetTotalsComponent', () => {
  let component: BudgetTotalsComponent;
  let fixture: ComponentFixture<BudgetTotalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetTotalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
