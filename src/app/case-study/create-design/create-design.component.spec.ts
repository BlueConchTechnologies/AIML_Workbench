import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDesignComponent } from './create-design.component';

describe('CreateDesignComponent', () => {
  let component: CreateDesignComponent;
  let fixture: ComponentFixture<CreateDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
