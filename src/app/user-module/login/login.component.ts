import {
    Component,
    OnInit,
} from '@angular/core';

import { Router } from '@angular/router';

import { LoggerService } from '@core';
import { FormBuilder, FormGroup, Validators,ValidatorFn,ValidationErrors, FormControl, NgModel, AbstractControl } from '@angular/forms';

import {
    HttpError,
    ErrorCode,
    ToastrCode,
    ErroNotificationType,
    UtilityService,
    ToastrService,
    AuthService
} from '@core';

import { Constants } from '@shared';

import { LoginModel } from './login.model';

import { LoginService } from './login.service';

import { environment } from '@env';
import { SpinnerService } from '@core'


@Component({
    selector: 'login-app',
    templateUrl: 'login.component.html',
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    // model: LoginModel;
    model : FormGroup
    showLogin = false;
    showLink: any;
    isInError: boolean;
    errorCode: string;
    errorMessage: string;
    // isAuthInitiated: boolean;
    login_submitted = false
    spinnerActive = false;
    loggedUser:any
    newUser:any
    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _utilityService: UtilityService,
        private _toastrService: ToastrService,
        private _authServiece: AuthService,
        private formBuilder: FormBuilder,
        private spinner: SpinnerService
    ) {
        // this.model = new LoginModel();
        // this.model.isAuthInitiated = false;
        // this.model.emailAddress  

    }

    ngOnInit() {
        this.showLogin = true;
        if (this._authServiece.isUserLoggedIn()) {
            this._router.navigate([Constants.uiRoutes.home]);
        }

        this.model = this.formBuilder.group({
            emailAddress: ['', [Validators.required] ],
            password: ['', [Validators.required]],
           
          });

        
      
    }

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
    }
}
