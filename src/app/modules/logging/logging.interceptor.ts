import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const started = Date.now();
    let ok: string;
    this.spinner.show();
    return next.handle(req).pipe(
      tap({
        next: (event) =>
          (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        error: (error) => (ok = 'failed'),
      }),

      finalize(() => {
        this.spinner.hide();
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
        console.log(msg)
      })
    );
  }
}
