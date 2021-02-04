import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunworkflowComponent } from './runworkflow.component';

describe('RunworkflowComponent', () => {
  let component: RunworkflowComponent;
  let fixture: ComponentFixture<RunworkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunworkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
