import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Professor } from 'src/interfaces/professor';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly uri = 'http://localhost:3001/api';

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  loginProfessor(paramsLogin: any) {
    const userMessage = "Veuillez revérifier vos identifiants et réessayez plus tard !";
    const headersContent = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post<any>(`${this.uri}/professor/login`, paramsLogin, {headers: headersContent})
      .pipe(
        catchError(err => this.errorService.handleHttpError(err, userMessage))
      )
  }
}
