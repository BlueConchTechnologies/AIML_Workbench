import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../../../src/app/global-module/services/notifications.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  closeResult: string;
  message: string;
  eventMsg: string;
  @ViewChild('contentAlert', { static: true }) contentAlert: ElementRef;
  @ViewChild('contentConfirm', { static: true }) contentConfirm: ElementRef;
  constructor(
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) {
    // this.notif = this.notificationService.notifyAlertModalRequired('hi');
  }

  ngOnInit() {

    this.notificationService.alertModalRequired.subscribe(message => {
      this.message = message;
      this.openAlertModal();
    });
    this.notificationService.confirmModalRequired.subscribe((message) => {
      this.message = message;
      this.openConfirmModal();
    });
  }

  openAlertModal() {
    this.modalService.open(this.contentAlert, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.eventMsg = 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.eventMsg = 'by clicking on a backdrop';
    } else {
      this.eventMsg = `with: ${reason}`;
    }
    return this.eventMsg;
  }

  openConfirmModal() {
    this.modalService.open(this.contentConfirm, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  }

