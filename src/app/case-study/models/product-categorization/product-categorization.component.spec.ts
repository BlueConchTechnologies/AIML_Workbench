import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategorizationComponent } from './product-categorization.component';

describe('ProductCategorizationComponent', () => {
  let component: ProductCategorizationComponent;
  let fixture: ComponentFixture<ProductCategorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
