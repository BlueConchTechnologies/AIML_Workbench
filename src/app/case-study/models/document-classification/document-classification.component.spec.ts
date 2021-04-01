import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentClassificationComponent } from './document-classification.component';

describe('DocumentClassificationComponent', () => {
  let component: DocumentClassificationComponent;
  let fixture: ComponentFixture<DocumentClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
