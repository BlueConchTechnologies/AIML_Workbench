import {
    Injectable
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class APIService {

    constructor(
        private http: HttpClient
    ) { }

    get(url: string): Observable<any> {
        return this.http.get(url);
    }

    post(url: string, data: Object): Observable<any> {
        return this.http.post(url, data);
    }

    put(url: string, data: Object): Observable<any> {
        return this.http.put(url, data);
    }

    delete(url: string): Observable<any> {
        return this.http.delete(url);
    }
}
