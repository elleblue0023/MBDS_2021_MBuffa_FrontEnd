import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { IProfessor } from 'src/interfaces/professor';
import { IPublication } from 'src/interfaces/publication';
import { DialogPublicationProfessorComponent } from '../professor/dashboard/publication-professor/dialog-publication-professor/dialog-publication-professor.component';
import { ConfigurationService } from './configuration.service';
import { ErrorService } from './error.service';


@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private readonly headerContent = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private confiService: ConfigurationService
  ) { }

  private readonly uri = this.confiService.getApiUrl();
  
  openDialog(inputDialogData: any) {    
    const dialogRef = inputDialogData._dialog.open(DialogPublicationProfessorComponent, {
      width: '100%',
      padding: '5px',
      data: inputDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  
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

  getCurrentPublication(id: any) {
    return this.http.get<IPublication>(`${this.uri}/professor/current-publication/${id}`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }
}
