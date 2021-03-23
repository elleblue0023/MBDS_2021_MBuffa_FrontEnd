import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICourse } from 'src/interfaces/course';
import { IPromotion } from 'src/interfaces/promotion';
import { ErrorTracker } from '../models/error-tracker';
import { ErrorService } from './error.service';
import { formatDate } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private readonly uri = 'http://localhost:3001/api';
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  getAllCourse() {
    return this.http.get<ICourse[]>(`${this.uri}/courses`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  getAllPromotion() {
    return this.http.get<IPromotion[]>(`${this.uri}/promotions`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  formatDate(dateToFormat: string) {
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    return formatDate(dateToFormat, format, locale);
  }
}
