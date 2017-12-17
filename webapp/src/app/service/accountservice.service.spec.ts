import { TestBed, inject } from '@angular/core/testing';

import { AccountserviceService } from './accountservice.service';

describe('AccountserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountserviceService]
    });
  });

  it('should be created', inject([AccountserviceService], (service: AccountserviceService) => {
    expect(service).toBeTruthy();
  }));
});
