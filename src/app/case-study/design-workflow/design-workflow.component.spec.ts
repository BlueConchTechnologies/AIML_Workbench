import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignWorkflowComponent } from './design-workflow.component';

describe('DesignWorkflowComponent', () => {
  let component: DesignWorkflowComponent;
  let fixture: ComponentFixture<DesignWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
