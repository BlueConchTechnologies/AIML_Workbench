import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsExtractionComponent } from './terms-extraction.component';

describe('TermsExtractionComponent', () => {
  let component: TermsExtractionComponent;
  let fixture: ComponentFixture<TermsExtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsExtractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
