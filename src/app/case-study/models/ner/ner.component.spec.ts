import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NERComponent } from './ner.component';

describe('NERComponent', () => {
  let component: NERComponent;
  let fixture: ComponentFixture<NERComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NERComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
