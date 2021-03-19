import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorTracker } from 'src/app/models/error-tracker';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleHttpError(error: HttpErrorResponse, userMessage: string): Observable<ErrorTracker> {
    var dataError = new ErrorTracker();
    dataError.message = error.message;
    dataError.errorNumber = error.status;
    dataError.userMessage = userMessage;
    
    return throwError(dataError);
  }
}
