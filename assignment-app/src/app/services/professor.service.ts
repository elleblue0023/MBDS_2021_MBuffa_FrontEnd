import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private readonly uri = 'http://localhost:3001/api';
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  saveProfessor(paramsProfessor: any) {
    const headersContent = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post<any>(`${this.uri}/professors`, paramsProfessor, {headers: headersContent})
      .pipe(
        catchError(err => this.errorService.handleHttpError(err, paramsProfessor))
      )
  }
}
