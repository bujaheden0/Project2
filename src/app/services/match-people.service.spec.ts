import { TestBed, inject } from '@angular/core/testing';

import { MatchPeopleService } from './match-people.service';

describe('MatchPeopleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchPeopleService]
    });
  });

  it('should be created', inject([MatchPeopleService], (service: MatchPeopleService) => {
    expect(service).toBeTruthy();
  }));
});
