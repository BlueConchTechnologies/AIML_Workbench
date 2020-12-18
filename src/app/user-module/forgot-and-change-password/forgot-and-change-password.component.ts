import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from '@core/services/toastr.service';
import { ToastrCode } from '@core';
import { LoginService } from 'app/user-module/login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-and-change-password',
  templateUrl: './forgot-and-change-password.component.html',
  styleUrls: ['./forgot-and-change-password.component.scss']
})
export class ForgotAndChangePasswordComponent implements OnInit {

  formCheck = false;
  userdetails: any[] = [];
  ResetForm: FormGroup;
  reactiveformModel: any = {
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  };
  responseMessage: any;
  model = {
    isAuthInitiated: false
  };

  constructor(private toastService: ToastrService, private fb: FormBuilder,
    private loginservice: LoginService, private router: Router) {
    this.ResetForm = this.fb.group({
      newpassword: [null, Validators.required],
      confirmpassword: [null, Validators.required]
    });
  }

  onSubmit(formdetails) {
    if (formdetails.controls.newpassword.value === '') {
      this.toastService.showError(ToastrCode.EmptyPassword);
    }
    this.formCheck = formdetails.controls.newpassword.value === formdetails.controls.confirmpassword.value;
    if (this.formCheck) {
      this.loginservice.setPassword(formdetails.controls.confirmpassword.value).subscribe(resp => {

        this.responseMessage = resp.message;
        if (this.responseMessage === 'OK') {
          this.toastService.showSuccess(ToastrCode.PasswordReset);
        }

        formdetails.reset();
        this.router.navigate(['/login']);
      });
    }
    else {
      this.toastService.showError(ToastrCode.PasswordNotMatched);
    }
  }

  ngOnInit() {
  }
}
