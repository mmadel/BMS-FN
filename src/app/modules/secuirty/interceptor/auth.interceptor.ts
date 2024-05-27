import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, from, mergeMap, Observable, tap, throwError } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from '../service/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private keycloakAngular: KeycloakService , private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.userService.getAccessToken())
    .pipe(
      mergeMap(token => {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(request);
      }
      ),
      finalize(() => {
      }), 
      catchError(error => {
        console.log(JSON.stringify(error))
        if (error.status === 401) {
          this.keycloakAngular.logout();
        }
        if (error.error.errorCode === 'UNAUTHORIZED') {
          this.keycloakAngular.logout();
        } else {
          return throwError(error);
        }
        return [];
      }))
  }
}
