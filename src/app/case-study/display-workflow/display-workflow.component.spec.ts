import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWorkflowComponent } from './display-workflow.component';

describe('DisplayWorkflowComponent', () => {
  let component: DisplayWorkflowComponent;
  let fixture: ComponentFixture<DisplayWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
