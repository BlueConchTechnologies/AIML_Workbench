import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { AccountInfoModel } from '@shared/infrastructure/accountinfo-model';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AccountDataService {
  private API_URL = environment.workbenchUrl;
  constructor(private http: HttpClient) {}

  saveData(accountinfo: AccountInfoModel): Observable<any> {
    const arr = [accountinfo];
    const headers = { 'content-type': 'application/json' };
    const options = { headers: headers };

    return this.http.post(this.API_URL + '/api/account', arr, options).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }
}
