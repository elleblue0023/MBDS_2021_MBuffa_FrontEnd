import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ConfigurationService } from './configuration.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AssignementService {

  
  private readonly headerContent = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private configService: ConfigurationService
  ) { }

  private readonly uri = this.configService.getApiUrl();

  updateAssignement(paramsAssignment: any) {
    return this.http.put<any>(`${this.uri}/assignments`, paramsAssignment, { headers: this.headerContent })
    .pipe(
      catchError(err => this.errorService.handleHttpError(err))
    )
  }
}
