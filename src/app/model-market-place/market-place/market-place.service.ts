import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '@shared';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketPlaceService {
  private API_URL = environment.workbenchUrl;
}
