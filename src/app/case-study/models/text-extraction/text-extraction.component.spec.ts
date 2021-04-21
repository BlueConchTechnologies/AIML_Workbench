import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextExtractionComponent } from './text-extraction.component';

describe('TextExtractionComponent', () => {
  let component: TextExtractionComponent;
  let fixture: ComponentFixture<TextExtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextExtractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
