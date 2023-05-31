import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { categoryGroupsForMonthResolver } from './category-groups-for-month.resolver';
import { ICategoryGroup } from '@model/interfaces/category-group';

describe('categoryGroupsForMonthResolver', () => {
  const executeResolver: ResolveFn<ICategoryGroup[] | null> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => categoryGroupsForMonthResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
