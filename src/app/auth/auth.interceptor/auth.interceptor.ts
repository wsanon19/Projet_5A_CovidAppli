import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const ACCESS_TOKEN_KEY = 'access_token';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${environment.host}/api/login`) || httpRequest.url.includes(`${environment.host}/api/token/refresh`)) {
      return httpHandler.handle(httpRequest);
    }

    else {
      httpRequest = httpRequest.clone({ headers: httpRequest.headers.set('Content-Type', 'application/json') });
      let token: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        httpRequest = httpRequest.clone({ headers: httpRequest.headers.set('Authorization', 'Bearer ' + token) });
      }
      return httpHandler.handle(httpRequest);

    }

  }

}
