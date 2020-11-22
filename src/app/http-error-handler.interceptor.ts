import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError( (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('this is client side error');
        }
        else {
          this.router.navigate(['/error']);
          console.error('this is server side error');
        }
        return throwError(error);
      })
    );
  }
}
