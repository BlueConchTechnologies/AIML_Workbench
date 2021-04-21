import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceRecognotionComponent } from './face-recognotion.component';

describe('FaceRecognotionComponent', () => {
  let component: FaceRecognotionComponent;
  let fixture: ComponentFixture<FaceRecognotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceRecognotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceRecognotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
