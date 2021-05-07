import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,ValidationErrors, FormControl, NgModel, AbstractControl } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { Constants } from '@shared';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  constructor(private formBuilder: FormBuilder,private _loginService: LoginService,private _router: Router,
    ) { }

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      fname: '',
      lname: '',
      email: '',
      password: '',
    });
  }


  onsignupformSubmit() {
    var firstName = this.signupform.value.fname;
    var lastName = this.signupform.value.lname;
    var email = this.signupform.value.email;
    var password = this.signupform.value.password;

    console.log(firstName,lastName,email,password)
    this._loginService.signUp(firstName,lastName,email,password)
    .subscribe(
        (successResponse) => {
            const response = successResponse;
            console.log("login response",response)
            this._router.navigate([Constants.uiRoutes.empty]);

            
            // location.reload()
        },
        (errorResponse) => {
            console.log('errorResponse',errorResponse)
        });
  }
}
