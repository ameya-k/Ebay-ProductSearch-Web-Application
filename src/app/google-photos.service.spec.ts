import { TestBed } from '@angular/core/testing';

import { GooglePhotosService } from './google-photos.service';

describe('GooglePhotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GooglePhotosService = TestBed.get(GooglePhotosService);
    expect(service).toBeTruthy();
  });
});
