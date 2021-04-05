import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IStudent } from 'src/interfaces/student';
import { StudialogLogoutComponent } from '../student/studashboard/studialog-logout/studialog-logout.component';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly uri = 'http://localhost:3001/api';
  private readonly headerContent = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  public behaviourCurrentStudent: BehaviorSubject<any>= new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private router: Router
  ) { }

  openLogOutDialog(inputDialogData: any) {
    const dialogRef = inputDialogData._dialog.open(StudialogLogoutComponent, {
      width: '35%',
      padding: '5px',
      data: inputDialogData
    });

    dialogRef.afterClosed().subscribe(logOutDialogData => {
      console.log(logOutDialogData);
    });
  }

  saveStudent(paramsStudent: any) {
    return this.http.post<any>(`${this.uri}/students`, paramsStudent, { headers: this.headerContent })
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  currentStudent() {
    return this.http.get<IStudent>(`${this.uri}/student`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  initializeCurrentStudent() {
    return this.currentStudent().pipe(
      tap(currentStudent => {
        this.behaviourCurrentStudent.next(currentStudent);
      }) 
    )
  }

  updateStudent(paramsStudent: any) {
    return this.http.put<any>(`${this.uri}/students`, paramsStudent, { headers: this.headerContent })
      .pipe(
        tap(result => {
          this.initializeCurrentStudent()
        },
        catchError(err => this.errorService.handleHttpError(err))
        )
      )
  }

  getCurrentStudent() {
    return this.behaviourCurrentStudent;
  }
}
