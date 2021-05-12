import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LoggerService, } from '@core';

import { Constants } from '@shared';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable()
export class LoginService {
    headers:any
    getLogedinuserId:any
    constructor(
        private _http: HttpClient,
        private _logger: LoggerService,
    ) {
        this._logger.info('LoginService : constructor ');
        // this.callHeaders()
       
    }
    // callHeaders(){
    //     return this.headers = new HttpHeaders({
    //        'Content-Type': 'application/json',
    //        'Access-Control-Allow-Origin':'*'
    //      })
    //    }

    logOn(email,password): Observable<any> {
        
        this._logger.info('LoginService : logOn ');
        return this._http.post(`${Constants.webApis.login}`,{email,password} );
    }
    getUserId () {
        this.getLogedinuserId = JSON.parse(localStorage.getItem('logedInUserData'));
         return this.getLogedinuserId._id
    }
    signUp(firstName,lastName,email,password): Observable<any> {
        return this._http.post(`${Constants.webApis.register}`,{firstName,lastName,email,password} );
    }
    updatePassword(password){
        console.log(`${Constants.webApis.change_password}`+this.getUserId ())
        return this._http.patch(`${Constants.webApis.change_password}`+this.getUserId (),{password} );
    }
    updatedetails(firstName,lastName){
        console.log(`${Constants.webApis.update}`+this.getUserId ())
        return this._http.put(`${Constants.webApis.update}`+this.getUserId (),{firstName,lastName} );
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
