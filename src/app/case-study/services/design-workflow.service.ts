import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DesignWorkflowService {
  nodeRedUrl = environment.nodeRedUrl;
  private apiUrl = environment.workbenchUrl;

  constructor(private httpClient: HttpClient) { }

  createFlow(flow: any) {
    return this.httpClient.post(this.nodeRedUrl + 'flows', flow);
  }

  startFlow() {
    return this.httpClient.post(this.nodeRedUrl + 'documentClassification', null);
  }

  finalizedFlow(data: any): Observable<any> {
    const url: string = this.apiUrl + '/api/dynamicfields';
    return this.httpClient.post(url, data);
  }

  getTrainModel() {
    const url: string = this.apiUrl + 'traintracker';
    return this.httpClient.get(url);
  }

}
