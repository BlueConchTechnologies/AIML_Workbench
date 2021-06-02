
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,ValidationErrors, FormControl, NgModel, AbstractControl } from '@angular/forms';
import { LoginService } from 'app/user-module/login/login.service';
import { Router } from '@angular/router';
import { Constants } from '@shared';
import { MustMatch } from 'app/user-module/helper/must-match.validator';
import { SpinnerService,ToastrService } from '@core'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  signupform: FormGroup;
  regi_submitted = false
  spinnerActive = false;

  constructor(private formBuilder: FormBuilder,private _loginService: LoginService,
    private _router: Router,private spinner: SpinnerService,private _toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.signupform = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      c_password:['', Validators.required]
    },  
    {validator: [
       MustMatch('password', 'c_password')
      ]});
  }

  get f_register() { return this.signupform.controls; }
  onsignupformSubmit() {
    this.regi_submitted = true;
    if (this.signupform.invalid) {
      return;
    }
   
    var password = this.signupform.value.password;

    console.log(password)
    this.spinnerActive = this.spinner.start();
    this._loginService.changePassword(password)
    .subscribe(
        (successResponse) => {
          this.spinnerActive = this.spinner.stop();
          this.regi_submitted = false;
            const response = successResponse;
            console.log("Updated Password response",response)
            this._toastrService.showSuccess('Password Updated Successfully');
            this._router.navigate([Constants.uiRoutes.empty]);
        },
        (errorResponse) => {
          this.spinnerActive = this.spinner.stop();
          this.regi_submitted = false;
          console.log('errorResponse',errorResponse.error);
          this._toastrService.showError(errorResponse.error);
           // alert(errorResponse.error);
        });
  }
}
 