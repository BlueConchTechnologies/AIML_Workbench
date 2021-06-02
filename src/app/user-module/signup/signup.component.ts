
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,ValidationErrors, FormControl, NgModel, AbstractControl } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { Constants } from '@shared';
import { MustMatch } from '../helper/must-match.validator';
import { SpinnerService, ToastrService, } from '@core';
import { MatStepperModule,MatStepper } from '@angular/material/stepper';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
 
})
export class SignupComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  regi_submitted = false
  spinnerActive = false;
  regi_submitted_second = false
  
  constructor(private formBuilder: FormBuilder,private _loginService: LoginService,
    private _router: Router,private spinner: SpinnerService,private _toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
  
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      c_password:['', Validators.required]
    },  
    {validator: [
       MustMatch('password', 'c_password')
      ]});

    
    this.secondFormGroup = this.formBuilder.group({
     ques1: ['', Validators.required],
     ques2: ['', Validators.required],
     ques3: ['', Validators.required],
    });
  }

  get f_register() { return this.firstFormGroup.controls; }

  nextClick(stepper: MatStepper) {
    console.log('Next button');
    
    this.regi_submitted = true;
    if (this.firstFormGroup.invalid) {
      return;
    }
    else{
      stepper.next();
    } 
  }
  
  get f_register1() { return this.secondFormGroup.controls; }
  onsignupformSubmit() {
    this.regi_submitted_second= true;
    
    if (this.secondFormGroup.invalid) {
      return;
    }
    var firstName = this.firstFormGroup.value.fname;
    var lastName = this.firstFormGroup.value.lname;
    var email = this.firstFormGroup.value.email;
    var password = this.firstFormGroup.value.password;

    var question1 = this.secondFormGroup.value.ques1;
    var question2 = this.secondFormGroup.value.ques2;
    var question3 = this.secondFormGroup.value.ques3;
    console.log(firstName,lastName,email,password);

    console.log(firstName,lastName,email,password,question1,question2,question3)
    this.spinnerActive = this.spinner.start();
    this._loginService.signUp(firstName,lastName,email,password,question1,question2,question3)
    .subscribe(
        (successResponse) => {
          this.spinnerActive = this.spinner.stop();
          this.regi_submitted_second = false;
            const response = successResponse;
            console.log("Register response",response)
            this._toastrService.showSuccess('Registration Successful');
            this._router.navigate([Constants.uiRoutes.empty]);
        },
        (errorResponse) => {
          this.spinnerActive = this.spinner.stop();

          this.regi_submitted_second = false;
            console.log('errorResponse',errorResponse.error);
            this._toastrService.showError(errorResponse.error);
           // alert(errorResponse.error);
        });
  }
}

//=======================================Above code is working=====================================================
 
  /*
  signupform: FormGroup;
  regi_submitted = false
  spinnerActive = false;
  constructor(private formBuilder: FormBuilder,private _loginService: LoginService,private _router: Router,private spinner: SpinnerService
    ) { }

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],

      ques1: ['', Validators.required],
      ques2: ['', Validators.required],
      ques3: ['', Validators.required],


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

    var question1 = this.signupform.value.ques1;
    var question2 = this.signupform.value.ques2;
    var question3 = this.signupform.value.ques3;

    console.log(firstName,lastName,email,password,question1,question2,question3)
    this.spinnerActive = this.spinner.start();
    this._loginService.signUp(firstName,lastName,email,password,question1,question2,question3)
    .subscribe(
        (successResponse) => {
          this.spinnerActive = this.spinner.stop();
          this.regi_submitted = false;
            const response = successResponse;
            console.log("Register response",response)
            this._router.navigate([Constants.uiRoutes.empty]);
        },
        (errorResponse) => {
          this.spinnerActive = this.spinner.stop();

          this.regi_submitted = false;
            console.log('errorResponse',errorResponse)
           // alert(errorResponse.error);
        });
  }
} */


//----------------------------------------new changes----------------------------------------------


