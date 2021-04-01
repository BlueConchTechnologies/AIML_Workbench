import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketClassificationComponent } from './ticket-classification.component';

describe('TicketClassificationComponent', () => {
  let component: TicketClassificationComponent;
  let fixture: ComponentFixture<TicketClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
