import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@global';

@Component({
  selector: 'app-modal-demo',
  templateUrl: './modal-demo.component.html',
  styleUrls: ['./modal-demo.component.css']
})
export class ModalDemoComponent implements OnInit {

  constructor(private _notificationService: NotificationService) { }

  ngOnInit() {
  }

  buttonClickedAlert() {
    this._notificationService.notifyAlertModalRequired('MESSAGES.Alert.message1');
  }
  buttonClickedConfirm() {
    this._notificationService.notifyConfirmModalRequired('MESSAGES.Confirmation.message1');
  }
}
