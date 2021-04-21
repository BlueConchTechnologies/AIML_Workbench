import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

import { LoggerService } from '../services/logger.service';

import {
    UtilityService,
    EnvironmentConfig,
    Constants
} from '../infrastructure/index';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    private isLoggedIn = false;
    private apiToken: string;

    constructor(
        private _logger: LoggerService,
        private _http: HttpClient,
    ) {
        this._logger.info('AuthService : constructor ');

        this.apiToken = localStorage.getItem(Constants.localStorageKeys.apiToken);
        this.isLoggedIn = localStorage.getItem(Constants.localStorageKeys.isLoggedIn) === 'true';
    }

    getAPIToken() {
        return this.apiToken;
    }

    isUserLoggedIn(): boolean {
        console.log('this.isLoggedIn',this.isLoggedIn)
        return this.isLoggedIn;
    }

    logOut(url: string): Observable<any> {
        this.isLoggedIn = false;
        this._logger.info('AuthService : LogOut');

        return this._http.get(url);
    }
}
