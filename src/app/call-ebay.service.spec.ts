import { TestBed } from '@angular/core/testing';

import { CallEbayService } from './call-ebay.service';

describe('CallEbayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallEbayService = TestBed.get(CallEbayService);
    expect(service).toBeTruthy();
  });
});
