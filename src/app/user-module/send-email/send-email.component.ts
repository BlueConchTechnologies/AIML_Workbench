import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/user-module/login';
import { ToastrService, ToastrCode, UtilityService } from '@core';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  emailvalue: string;
  setPassword = false;
  checkResponse: any;
  resetConfirm: any;
  emailLink = '';
  confirmUser = false;
  tokenvalue: string;
  model = {
    emailvalue: '',
    isAuthInitiated: false
  };

  constructor(private loginservice: LoginService,
    private _toastrService: ToastrService,
    private utiltiyService: UtilityService) { }

  ngOnInit() {

  }

  onSubmit() {
    if (this.emailvalue === undefined) {
      this._toastrService.showError(ToastrCode.EmptyEmailAddress);
    } else {
      this.loginservice.onForgotClick().subscribe(resp => {
        this.checkResponse = resp;
        this.tokenvalue = this.checkResponse.resetToken;
        if (this.tokenvalue) {
          this._toastrService.showSuccess(ToastrCode.EmailSent);
        }
      });
      this.showLinK();
    }
  }

  showLinK() {
    setTimeout(() => {
      this.confirmUser = true;
      this.emailLink = '/forgotpassword?&token=6678asdszclAAG6757613';
    }, 2000);
  }

  gotoForgotPassword() {

    this.loginservice.resetPassword(this.tokenvalue).subscribe(response => {
      this.resetConfirm = response;
      if (this.resetConfirm.message === 'OK') {
        this.utiltiyService.openInNewTab(this.emailLink);
      }
      else {
        this._toastrService.showError(ToastrCode.InvalidLink);
      }
    });
  }
}
