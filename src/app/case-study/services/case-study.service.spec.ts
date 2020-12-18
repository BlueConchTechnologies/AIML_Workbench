import { TestBed } from '@angular/core/testing';

import { CaseStudyService } from './case-study.service';

describe('CaseStudyService', () => {
  let service: CaseStudyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseStudyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
