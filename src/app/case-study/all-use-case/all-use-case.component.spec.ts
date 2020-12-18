import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUseCaseComponent } from './all-use-case.component';

describe('AllUseCaseComponent', () => {
  let component: AllUseCaseComponent;
  let fixture: ComponentFixture<AllUseCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUseCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUseCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
