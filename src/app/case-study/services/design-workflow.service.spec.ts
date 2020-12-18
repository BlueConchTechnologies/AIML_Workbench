import { TestBed } from '@angular/core/testing';

import { DesignWorkflowService } from './design-workflow.service';

describe('DesignWorkflowService', () => {
  let service: DesignWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
