import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class ModelDataService {
  private API_URL = environment.workbenchUrl;

  //Dummy Data for Model-Market place
  // modelData=[{
  //   id:1,"header":"First Component","content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",isSelected:false
  // },{
  //   id:2,"header":"Second Component","content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",isSelected:false
  // },{
  //   id:3,"header":"Third Component","content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",isSelected:false
  // },{
  //   id:4,"header":"Fourth Component","content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",isSelected:false
  // },{
  //   id:5,"header":"Fifth Component","content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",isSelected:false
  // },{
  //   id:6,"header":"Sixth Component","content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",isSelected:false
  // },{
  //   id:7,"header":"Seventh Component","content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",isSelected:false
  // },{
  //   id:8,"header":"Eighth Component","content":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",isSelected:false
  // }];
  // header_node:any
  constructor(private http: HttpClient,) {
    // this.header_node = {
    //   headers: new HttpHeaders(
    //       { 'rejectUnauthorized': 'false' })
    //   };
   }



  //Create the record
  selectedModels(request: any): Observable<any> {
    const url: string = this.API_URL + '/api/traintracker';
    console.log("request traintracker",request)
    return this.http.post(url, request);
  }
  //Get The Selected Model List
  getModelList(user_id:any): Observable<any>  {
    const url: string = this.API_URL + '/api/traintracker?user_id='+ user_id;
    return this.http.get(url);
  }

  getModelHistory(trainTracker_id:any): Observable<any>  {
    const url: string = this.API_URL + '/api/training/history?trainTracker_id='+ trainTracker_id;
    return this.http.get(url);
  }

  getModelUploadHistory(trainTracker_id: any): Observable<any> {
    const url: string = this.API_URL + '/api/upload/history?trainTracker_id=' + trainTracker_id;
    return this.http.get(url);
  }

  getModelDetails(originalModelName: any): Observable<any> {
    const url: string = this.API_URL + '/api/modeldetails?original_model_name=' + originalModelName;
    return this.http.get(url);
  }

  //Update the Selected Model List
    uploadData(fileData) {
      const url: string = this.API_URL + '/api/uploadfile';
      return this.http.post(url, fileData);
    }

  //To train the model
  trainModel(modelData) {
    const url: string = this.API_URL + '/api/trainmodel';
    return this.http.post(url, modelData);
  }

  //Add-Model Param
  addModelParam(formData){
    const url: string = this.API_URL + '/api/traintracker';
    return this.http.put(url, formData);
  }
}
