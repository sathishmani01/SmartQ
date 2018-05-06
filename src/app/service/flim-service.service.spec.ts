import { TestBed, inject } from '@angular/core/testing';

import { FlimServiceService } from './flim-service.service';

describe('FlimServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlimServiceService]
    });
  });

  it('should be created', inject([FlimServiceService], (service: FlimServiceService) => {
    expect(service).toBeTruthy();
  }));
});
