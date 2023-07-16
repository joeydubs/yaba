import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { lineItemsResolver } from './line-items.resolver';

describe('lineItemsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => lineItemsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
