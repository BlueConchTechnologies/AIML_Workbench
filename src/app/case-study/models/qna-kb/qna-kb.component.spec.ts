import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QNAKBComponent } from './qna-kb.component';

describe('QNAKBComponent', () => {
  let component: QNAKBComponent;
  let fixture: ComponentFixture<QNAKBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QNAKBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QNAKBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
