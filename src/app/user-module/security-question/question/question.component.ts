import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ValidatorFn,ValidationErrors, FormControl, NgModel } from '@angular/forms';
import { Constants } from '@shared';
import { LoginService } from 'app/user-module/login/login.service';
import { SpinnerService,  ToastrService} from '@core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionForm : FormGroup;
  regi_submitted = false
  spinnerActive = false;
  constructor(private formBuilder: FormBuilder,private _loginService: LoginService,private _router: Router,private spinner: SpinnerService, private _toastrService: ToastrService
    ) { }

  ngOnInit() {
    this. questionForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required] ],
      ques1: ['', Validators.required],
      ques2: ['', Validators.required],
      ques3: ['', Validators.required]
    });

  }

  get f_register() { return this.questionForm.controls; }
  onsignupformSubmit() {
    this.regi_submitted = true;
    if (this.questionForm.invalid) {
      return;
    }
    
    var email = this.questionForm.value.emailAddress;
    var question1 = this.questionForm.value.ques1;
    var question2 = this.questionForm.value.ques2;
    var question3 = this.questionForm.value.ques3;

    console.log(email,question1,question2,question3)
    this.spinnerActive = this.spinner.start();
    this._loginService.securityQuestion(email,question1,question2,question3)
    .subscribe(
        (successResponse) => {
          this.spinnerActive = this.spinner.stop();
          this.regi_submitted = false;
            const response = successResponse;
            console.log("User Security Question Details",response)
            localStorage.setItem('Password_Data',JSON.stringify(response.data));
            this._toastrService.showSuccess('Match');
            this._router.navigate([Constants.uiRoutes.forgot_password]);
        },
        (errorResponse) => {
          this.spinnerActive = this.spinner.stop();

          this.regi_submitted = false;
            console.log('errorResponse',errorResponse)
            this._toastrService.showError('Invalid Answer');
            //alert(errorResponse.error);
        });
  }

}
/*
get f_login() { return this.model.controls; }
login() {
    this.login_submitted = true;
    if (this.model.invalid) {
      return;
    }
    this.spinnerActive = this.spinner.start();
        this._loginService.logOn(this.model.value.emailAddress, this.model.value.password )
            .subscribe(
                (successResponse) => {
                    this.spinnerActive = this.spinner.stop();
                    this.login_submitted = false;
                    const response = successResponse;
                    console.log("login response",response.data)
                    localStorage.setItem(Constants.localStorageKeys.isLoggedIn, 'true');    
                    //localStorage.setItem("logedInUsername", this.model.value.emailAddress);
                    localStorage.setItem("logedInUser_id", response.data._id);

                    //  remove the @, . from the email id(username)
                    this.loggedUser = this.model.value.emailAddress;
            
                    this.newUser = this.loggedUser.replace('@','').replace('.','');
                    console.log('user logged in is',this.loggedUser);
                    console.log('user',this.newUser);
                    localStorage.setItem("logedInUsername", this.newUser);
                    
                    localStorage.setItem('logedInUserData',JSON.stringify(response.data));   
                    location.reload()
                },
                (errorResponse) => {
                    this.spinnerActive = this.spinner.stop();
                    this.login_submitted = false;
                    this._toastrService.showError('Please enter valid username and password');
                    console.log('errorResponse',errorResponse)
                    this.resetModel();
                    throw new HttpError(ErrorCode.AuthFailedInvalidAuthResponse, ErroNotificationType.Dialog, errorResponse);
                });
   
}

getUserData(){
    this.loggedUser = localStorage.getItem('logedInUsername');
    this.newUser = this.loggedUser.replace('@','').replace('.','');
    console.log('user logged in is',this.loggedUser);
    console.log('user',this.newUser);

   }

processLoginRequest(response: any) {
    if (response) {
        localStorage.setItem(Constants.localStorageKeys.isLoggedIn, 'true');
        localStorage.setItem(Constants.localStorageKeys.apiToken, response.apiToken);
        this._utilityService.redirectToURL('/home');
    }
}

resetModel() {
    this.model.value.emailAddress = '';
    this.model.value.password = '';
}*/
