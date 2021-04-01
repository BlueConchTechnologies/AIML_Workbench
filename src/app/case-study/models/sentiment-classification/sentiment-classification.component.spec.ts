import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentClassificationComponent } from './sentiment-classification.component';

describe('SentimentClassificationComponent', () => {
  let component: SentimentClassificationComponent;
  let fixture: ComponentFixture<SentimentClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentimentClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
