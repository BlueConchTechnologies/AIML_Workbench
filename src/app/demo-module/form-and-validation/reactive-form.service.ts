import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Constants } from '@shared/infrastructure';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormService {

  constructor(private http: HttpClient) { }

  public getFormData(): Observable<any> {
    return this.http.get(Constants.reusableComponentURL.reactiveformJsonURL);
  }
}
