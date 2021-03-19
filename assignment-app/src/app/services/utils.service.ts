import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from 'src/interfaces/course';
import { Promotion } from 'src/interfaces/promotion';
import { ErrorTracker } from '../models/error-tracker';
import { ErrorService } from './error.service';

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
    const userMessage = "Une erreur s'est produite lors de la récupération de la liste des cours";
    return this.http.get<Course[]>(`${this.uri}/courses`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err, err.message))
      )
  }

  getAllPromotion() {
    const userMessage = "Une erreur s'est produite lors de la récupération de la liste des promotions";
    return this.http.get<Promotion[]>(`${this.uri}/promotions`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err, userMessage))
      )
  }
}
