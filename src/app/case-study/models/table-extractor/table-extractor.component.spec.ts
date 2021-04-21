import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableExtractorComponent } from './table-extractor.component';

describe('TableExtractorComponent', () => {
  let component: TableExtractorComponent;
  let fixture: ComponentFixture<TableExtractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableExtractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableExtractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
