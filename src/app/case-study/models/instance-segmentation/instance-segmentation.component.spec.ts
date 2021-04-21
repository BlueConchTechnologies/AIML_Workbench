import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSegmentationComponent } from './instance-segmentation.component';

describe('InstanceSegmentationComponent', () => {
  let component: InstanceSegmentationComponent;
  let fixture: ComponentFixture<InstanceSegmentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceSegmentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
