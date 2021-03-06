import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAssignment } from 'src/interfaces/assignment';
import { IProfessor } from 'src/interfaces/professor';
import { IPublication } from 'src/interfaces/publication';
import { DialogLogoutComponent } from '../professor/dashboard/dialog-logout/dialog-logout.component';
import { ConfigurationService } from './configuration.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  
  private readonly headerContent = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  public behaviourCurrentProfessor: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public publicationCount = new Subject();

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private router: Router,
    private configService: ConfigurationService
  ) { }

  private readonly uri = this.configService.getApiUrl();

  openLogOutDialog(inputDialogData: any) {
    const dialogRef = inputDialogData._dialog.open(DialogLogoutComponent, {
      width: '35%',
      padding: '5px',
      data: inputDialogData
    });

    dialogRef.afterClosed().subscribe(logOutDialogData => {
      console.log(logOutDialogData);
      localStorage.removeItem('token');
      localStorage.removeItem('currentstatus');
      this.behaviourCurrentProfessor.next(null);
      this.router.navigate(['']);
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
        tap(result => {
          this.initializeCurrentProfessor()
        },
          catchError(err => this.errorService.handleHttpError(err))
        )
      )
  }

  getProfessorPublication() {
    return this.http.get<IPublication[]>(`${this.uri}/professor/publications/professors`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  getProfessorPublicationPagine(page:number,limit:number):Observable<any>{
    return this.http.get<IPublication[]>(`${this.uri}/professor/publications/professors/listpaged?page=${page}&limit=${limit}`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      );
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
    return this.http.put<any>(`${this.uri}/professor/publications`, paramsPublicationEdit, { headers: this.headerContent })
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  initializeCurrentProfessor() {
    return this.currentProfessor().pipe(
      tap(currentProfessor => {
        this.behaviourCurrentProfessor.next(currentProfessor);
      })
    )
  }

  getAssignmentListPublication(id: any) {
    return this.http.get<IAssignment[]>(`${this.uri}/assignments/student/publication/${id}`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  getCurrentProfessor() {
    return this.behaviourCurrentProfessor;
  }
}
