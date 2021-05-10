import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,ValidationErrors, FormControl, NgModel, AbstractControl } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { Constants } from '@shared';
import { MustMatch } from '../helper/must-match.validator';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  regi_submitted = false
  constructor(private formBuilder: FormBuilder,private _loginService: LoginService,private _router: Router,
    ) { }

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
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
    var firstName = this.signupform.value.fname;
    var lastName = this.signupform.value.lname;
    var email = this.signupform.value.email;
    var password = this.signupform.value.password;

    console.log(firstName,lastName,email,password)
    this._loginService.signUp(firstName,lastName,email,password)
    .subscribe(
        (successResponse) => {
          this.regi_submitted = false;
            const response = successResponse;
            console.log("login response",response)
            this._router.navigate([Constants.uiRoutes.empty]);
        },
        (errorResponse) => {
          this.regi_submitted = false;
            console.log('errorResponse',errorResponse)
        });
  }
}
