import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamolyDetectionComponent } from './anamoly-detection.component';

describe('AnamolyDetectionComponent', () => {
  let component: AnamolyDetectionComponent;
  let fixture: ComponentFixture<AnamolyDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnamolyDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnamolyDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
