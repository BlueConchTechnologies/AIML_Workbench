import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUseCaseComponent } from './create-use-case.component';

describe('CreateUseCaseComponent', () => {
  let component: CreateUseCaseComponent;
  let fixture: ComponentFixture<CreateUseCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUseCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUseCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
