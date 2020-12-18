import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LoggerService, } from '@core';

import { Constants } from '@shared';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

    constructor(
        private _http: HttpClient,
        private _logger: LoggerService,
    ) {
        this._logger.info('LoginService : constructor ');
    }

    logOn(request: any): Observable<any> {
        this._logger.info('LoginService : logOn ');
        return this._http.post(`${Constants.webApis.login}`, request);
    }
    onForgotClick(): Observable<any> {
        return this._http.get(`${Constants.webApis.sendEmail}`);
    }
    resetPassword(usertoken: string): Observable<any> {
        return this._http.get(`${Constants.webApis.resetPassword}` + '/' + usertoken);
    }
    setPassword(request: string): Observable<any> {
        return this._http.post(`${Constants.webApis.setPassword}`, request);
    }
}
