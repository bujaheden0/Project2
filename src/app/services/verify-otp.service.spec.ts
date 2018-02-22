import { TestBed, inject } from '@angular/core/testing';

import { VerifyOtpService } from './verify-otp.service';

describe('VerifyOtpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifyOtpService]
    });
  });

  it('should be created', inject([VerifyOtpService], (service: VerifyOtpService) => {
    expect(service).toBeTruthy();
  }));
});
