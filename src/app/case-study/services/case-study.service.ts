import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '@shared';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CaseStudyService {
  private API_URL = environment.workbenchUrl;
  private NODE_URL = environment.nodeRedUrl;

  constructor(private _http: HttpClient) { }

  getAllUseCases(): Observable<any> {
    return this._http.get(this.API_URL + '/api/dynamicfields');
  }
  getPrebuiltUseCases(userId): Observable<any> {
    return this._http.get(this.API_URL + `/api/usecases?user_id=${userId}`);
  } 

  createUsecase(request: any): Observable<any> {
    return this._http.post(this.API_URL + '/api/dynamicfields', request);
  }

  createRunWorkflow(request: any): Observable<any> {
    return this._http.post(this.NODE_URL + 'documentClassification', request);
  }
  runWorkflow(request: any): Observable<any> {
    console.log("modeldta to api",request)
    return this._http.post(this.API_URL + '/api/predict', request);
  }

  runWorkflow_imageFormatOutput(request: any): Observable<any> {
    return this._http.post(this.API_URL + '/api/predict', request,{observe: 'body', responseType: 'blob'});
  }

 
  
}
