import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { ConfigurationService } from './configuration.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private confiService: ConfigurationService
  ) { }

  private readonly uri = this.confiService.getApiUrl();

  loginProfessor(paramsLogin: any) {
    const headersContent = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post<any>(`${this.uri}/professor/login`, paramsLogin, {headers: headersContent})
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  loginStudent(paramsLogin: any) {
    const headersContent = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post<any>(`${this.uri}/students/login`, paramsLogin, {headers: headersContent})
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }
}
