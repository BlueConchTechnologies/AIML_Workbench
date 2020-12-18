import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, throwError as _throw } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '@core/infrastructure';
import { environment } from 'environments/environment';
import { AuthService } from '@core/extensions';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

    constructor(private _auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const token: string = this._auth.getAPIToken();
        let customReq: HttpRequest<any>;
        customReq = request.clone({
            headers: request.headers.set(Constants.requestHeader.accept, Constants.contentType.json)
        });
        if (token && request.url.indexOf(environment.apiUrl) !== -1) {
            customReq = customReq.clone({
                headers: customReq.headers.set(Constants.requestHeader.authorization, `${Constants.requestHeader.bearer} ${token}`)
            });
        }

        return next.handle(customReq).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (!environment.production) {
                        // console.info('event--->>>', event);
                    }
                }
                return event;
            }));
    }
}
