import { TestBed } from '@angular/core/testing';

import { WishProdService } from './wish-prod.service';

describe('WishProdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WishProdService = TestBed.get(WishProdService);
    expect(service).toBeTruthy();
  });
});
