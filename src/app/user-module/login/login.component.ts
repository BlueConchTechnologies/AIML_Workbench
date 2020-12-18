import {
    Component,
    OnInit,
} from '@angular/core';

import { Router } from '@angular/router';

import { LoggerService } from '@core';

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

@Component({
    selector: 'login-app',
    templateUrl: 'login.component.html',
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    model: LoginModel;
    showLogin = false;
    showLink: any;

    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _utilityService: UtilityService,
        private _toastrService: ToastrService,
        private _authServiece: AuthService
    ) {
        this.model = new LoginModel();
        this.model.isAuthInitiated = false;

    }

    ngOnInit() {
        this.showLogin = true;
        if (this._authServiece.isUserLoggedIn()) {
            this._router.navigate([Constants.uiRoutes.home]);
        }
    }

    login() {
        this.model.isAuthInitiated = true;
        if (!this.model.emailAddress) {
            this.model.isAuthInitiated = false;
            this._toastrService.showError(ToastrCode.EmptyEmailAddress);
        } else if (!this.model.password) {
            this.model.isAuthInitiated = false;
            this._toastrService.showError(ToastrCode.EmptyPassword);
        } else {
            this.model.isAuthInitiated = true;
            this._loginService.logOn({ UserName: this.model.emailAddress, Password: this.model.password })
                .subscribe(
                    (successResponse) => {
                        const response = successResponse;
                        this._utilityService.redirectToURL('/home');
                        this.model.isAuthInitiated = false;
                        localStorage.setItem(Constants.localStorageKeys.isLoggedIn, 'true');
                    },
                    (errorResponse) => {
                        this.resetModel();
                        this.model.isAuthInitiated = false;
                        throw new HttpError(ErrorCode.AuthFailedInvalidAuthResponse, ErroNotificationType.Dialog, errorResponse);
                    });
        }
    }

    processLoginRequest(response: any) {
        if (response) {
            localStorage.setItem(Constants.localStorageKeys.isLoggedIn, 'true');
            localStorage.setItem(Constants.localStorageKeys.apiToken, response.apiToken);
            this._utilityService.redirectToURL('/home');
        }
    }

    resetModel() {
        this.model.emailAddress = '';
        this.model.password = '';
    }
}
