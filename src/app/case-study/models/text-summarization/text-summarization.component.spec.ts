import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSummarizationComponent } from './text-summarization.component';

describe('TextSummarizationComponent', () => {
  let component: TextSummarizationComponent;
  let fixture: ComponentFixture<TextSummarizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSummarizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSummarizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
