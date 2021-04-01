import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatePredictionComponent } from './duplicate-prediction.component';

describe('DuplicatePredictionComponent', () => {
  let component: DuplicatePredictionComponent;
  let fixture: ComponentFixture<DuplicatePredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicatePredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
