import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ErrorTracker } from '../models/error-tracker';
import { DesignUtilService } from './design-util.service';
import { ProfessorService } from './professor.service';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private professorService: ProfessorService,
    private studentService: StudentService,
    private designUtilService: DesignUtilService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem("token");
    const currentstatus = localStorage.getItem("currentstatus");
    let result = false;
    if (token) {
      if(currentstatus == "professor"){
        console.log('Professor authentificated by Guard');
      
        this.professorService.initializeCurrentProfessor().subscribe(undefined, 
          (error: ErrorTracker) => {
          let snackBarData = {
            message: error.userMessage,
            action: "OK",
            status: "warning"
          }
          this.designUtilService.openSnackBar(snackBarData)
        } ); 
      }
      else if(currentstatus == "student"){
        console.log('Student authentificated by Guard');
      
        this.studentService.initializeCurrentStudent().subscribe(undefined, 
          (error: ErrorTracker) => {
          let snackBarData = {
            message: error.userMessage,
            action: "OK",
            status: "warning"
          }
          this.designUtilService.openSnackBar(snackBarData)
        } ); 
      }
      /* this.professorService.initializeCurrentProfessor().pipe(
        map(currentProfessor => {
          this.professorService.behaviour.next({})
        }) 
      );  */
      return true;
    } else {
      this.router.createUrlTree(['/']);
      console.log('Not privileged');
      return result;
    }
  }
}
