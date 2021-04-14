import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAssignment } from 'src/interfaces/assignment';
import { IPublication } from 'src/interfaces/publication';
import { IStudent } from 'src/interfaces/student';
import { StudialogLogoutComponent } from '../student/studashboard/studialog-logout/studialog-logout.component';
import { ConfigurationService } from './configuration.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly headerContent = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  public behaviourCurrentStudent: BehaviorSubject<any>= new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private router: Router,
    private configService: ConfigurationService
  ) { }

  private readonly uri = this.configService.getApiUrl();

  openLogOutDialog(inputDialogData: any) {
    const dialogRef = inputDialogData._dialog.open(StudialogLogoutComponent, {
      width: '35%',
      padding: '5px',
      data: inputDialogData
    });

    dialogRef.afterClosed().subscribe(logOutDialogData => {
      console.log(logOutDialogData);
      localStorage.removeItem('token');
      localStorage.removeItem('currentstatus');
      this.behaviourCurrentStudent.next(null);
      console.log('deconnecté');
      this.router.navigate(['']);
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

  getPromotionPublications(promo: any) {
    return this.http.get<IPublication[]>(`${this.uri}/professor/publications/assignment/${promo}`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  getPromotionPublicationsPagine(promo:any,page:number,limit:number):Observable<any>{
    return this.http.get<IPublication[]>(`${this.uri}/professor/publications/assignment/listpaged/${promo}?page=${page}&limit=${limit}`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      );
  }

  saveAssignmentForCurrStu(paramsAssignment: any) {
    return this.http.post<any>(`${this.uri}/assignments`, paramsAssignment, { headers: this.headerContent })
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  getStudentAssignment() {
    return this.http.get<IAssignment[]>(`${this.uri}/assignments/student/list`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  getCurrentStudent() {
    return this.behaviourCurrentStudent;
  }
}
