import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { IProfessor } from 'src/interfaces/professor';
import { IPublication } from 'src/interfaces/publication';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private readonly uri = 'http://localhost:3001/api';
  private readonly headerContent = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  saveProfessor(paramsProfessor: any) {
    return this.http.post<any>(`${this.uri}/professors`, paramsProfessor, { headers: this.headerContent })
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  getProfessorPublication() {
    return this.http.get<IPublication[]>(`${this.uri}/professor/publications/professors`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  getCurrentProfessor() {
    return this.http.get<IProfessor>(`${this.uri}/professor`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  savePublication(paramsPublication: any) {
    return this.http.post<any>(`${this.uri}/professor/publications`, paramsPublication, {headers: this.headerContent})
    .pipe(
      catchError(err => this.errorService.handleHttpError(err))
    )
  }
}
