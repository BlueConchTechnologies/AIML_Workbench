import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerDiarizationComponent } from './speaker-diarization.component';

describe('SpeakerDiarizationComponent', () => {
  let component: SpeakerDiarizationComponent;
  let fixture: ComponentFixture<SpeakerDiarizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerDiarizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerDiarizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
