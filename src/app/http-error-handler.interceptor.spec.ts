import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';
import { API_CONFIG, API_CONFIG_TOKEN } from './shared/config/api.config';
import { SharedService } from './shared/services/shared.service';
import { throwError } from 'rxjs';

describe('HttpErrorHandlerInterceptor', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;
  let interceptor: HttpErrorHandlerInterceptor;
  let httpRequestSpy;
  let httpHandlerSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SharedService,
        HttpErrorHandlerInterceptor,
        {provide: API_CONFIG_TOKEN, useValue: API_CONFIG},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorHandlerInterceptor,
          multi: true,
        }
      ]
    });

    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(HttpErrorHandlerInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should return the catchError returned from api', () => {
    httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(throwError(
        {error:
            {message: 'test-error'}
        }
    ));
    interceptor.intercept(httpRequestSpy, httpHandlerSpy)
        .subscribe(
            result => console.log('good', result),
            err => {
                console.log('error', err);
                expect(err.error.message).toEqual('test-error');
            }
        );
  });
});
