import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Marketplacemodel } from '@shared/infrastructure/market-place-model';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MarketmodelDataService {
  private API_URL = environment.workbenchUrl;
  constructor(private http: HttpClient) {}

  showData(): Observable<Marketplacemodel[]> {
    return this.http.get<Marketplacemodel[]>(
      this.API_URL + '/api/modeldetails'
    );
  }

  //  return this.http
  //    .post(this.API_URL + "/api/modeldetails", marketplaceinfo)
  //    .pipe(
  //      catchError((err) => {
  //        console.error(err);
  //        throw err;
  //      })
  //    );
}
