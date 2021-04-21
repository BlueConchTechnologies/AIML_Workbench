import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceClassificationComponent } from './voice-classification.component';

describe('VoiceClassificationComponent', () => {
  let component: VoiceClassificationComponent;
  let fixture: ComponentFixture<VoiceClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
