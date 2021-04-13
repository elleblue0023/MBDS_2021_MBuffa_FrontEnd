import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AssignementService {

  private readonly uri = 'http://localhost:3001/api';
  private readonly headerContent = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  updateAssignement(paramsAssignment: any) {
    return this.http.put<any>(`${this.uri}/assignments`, paramsAssignment, { headers: this.headerContent })
    .pipe(
      catchError(err => this.errorService.handleHttpError(err))
    )
  }
}
