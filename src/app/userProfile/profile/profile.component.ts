import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,ValidationErrors, FormControl, NgModel, AbstractControl } from '@angular/forms';
import { LoginService } from '../../user-module/login/login.service';
import { Router } from '@angular/router';
import { Constants } from '@shared';
import { MustMatch } from '../../user-module/helper/must-match.validator';
import { SpinnerService } from '@core'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 updateform: FormGroup;
  update_submitted = false
  spinnerActive = false;
  userData:any;
  constructor(private formBuilder: FormBuilder,private _loginService: LoginService,private _router: Router,private spinner: SpinnerService
    ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('logedInUserData'))
    console.log(this.userData)
    this.updateform = this.formBuilder.group({
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

  get f_update() { return this.updateform.controls; }
  onupdateformSubmit() {
    this.update_submitted = true;
    if (this.updateform.invalid) {
      return;
    }
    var firstName = this.updateform.value.fname;
    var lastName = this.updateform.value.lname;
    var email = this.updateform.value.email;
    var password = this.updateform.value.password;

    console.log(firstName,lastName,email,password)
    this.spinnerActive = this.spinner.start();

  

    //call update details
    this._loginService.updatedetails(firstName,lastName).subscribe(
      (successResponse) => {
        this.spinnerActive = this.spinner.stop();
        this.update_submitted = false;
          const response = successResponse;
          console.log("updatedetails response",response)

          //call update password
            this._loginService.updatePassword(password).subscribe(
              (successResponse) => {
                this.spinnerActive = this.spinner.stop();
                this.update_submitted = false;
                  const response = successResponse['data'];
                  console.log("updatePassword response",response)
                  localStorage.setItem('logedInUserData',JSON.stringify(response));   
                        location.reload()
              },
              (errorResponse) => {
                this.spinnerActive = this.spinner.stop();
                this.update_submitted = false;
                  console.log('errorResponse',errorResponse)
              });

        
      },
      (errorResponse) => {

        this.spinnerActive = this.spinner.stop();

        this.update_submitted = false;
          console.log('errorResponse',errorResponse)
      });

        
    
  }
}