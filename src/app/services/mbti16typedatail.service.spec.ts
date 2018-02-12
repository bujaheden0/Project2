import { TestBed, inject } from '@angular/core/testing';

import { Mbti16typedatailService } from './mbti16typedatail.service';

describe('Mbti16typedatailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Mbti16typedatailService]
    });
  });

  it('should be created', inject([Mbti16typedatailService], (service: Mbti16typedatailService) => {
    expect(service).toBeTruthy();
  }));
});
