import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { IProfessor } from 'src/interfaces/professor';
import { IPublication } from 'src/interfaces/publication';
import { DialogLogoutComponent } from '../professor/dashboard/dialog-logout/dialog-logout.component';
import { DialogPublicationProfessorComponent } from '../professor/dashboard/publication-professor/dialog-publication-professor/dialog-publication-professor.component';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private readonly uri = 'http://localhost:3001/api';
  private readonly headerContent = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  public behaviour = new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private router: Router
  ) { }


  openLogOutDialog(inputDialogData: any) {
    const dialogRef = inputDialogData._dialog.open(DialogLogoutComponent, {
      width: '35%',
      padding: '5px',
      data: inputDialogData
    });

    dialogRef.afterClosed().subscribe(logOutDialogData => {
      console.log(logOutDialogData);
    });
  }


  saveProfessor(paramsProfessor: any) {
    return this.http.post<any>(`${this.uri}/professors`, paramsProfessor, { headers: this.headerContent })
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }


  updateProfessor(paramsProfessor: any) {
    return this.http.put<any>(`${this.uri}/professors`, paramsProfessor, { headers: this.headerContent })
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

  currentProfessor() {
    return this.http.get<IProfessor>(`${this.uri}/professor`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  savePublication(paramsPublication: any) {
    return this.http.post<any>(`${this.uri}/professor/publications`, paramsPublication, { headers: this.headerContent })
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

  updatePublication(paramsPublicationEdit: any) {
    return this.http.post<any>(`${this.uri}/professor/publication`, paramsPublicationEdit, { headers: this.headerContent })
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  initializeCurrentProfessor() {
    return this.currentProfessor().pipe(
      tap(currentProfessor => {
        this.behaviour.next(currentProfessor);
      }) 
    )
  }

  getCurrentProfessor() {
    return this.behaviour;
  }
}
