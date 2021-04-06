import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorTracker } from '../models/error-tracker';
import { AuthService } from '../services/auth.service';
import { DesignUtilService } from '../services/design-util.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;

  

  constructor(
    private authService: AuthService, 
    private router: Router,
    private designUtilService: DesignUtilService,
    private _snackBar: MatSnackBar
  ) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      statut: new FormControl('', Validators.required)
    });
  }


  ngOnInit(): void {
  }

  onLogin() {
    if (this.loginForm.valid) {
      const statut = this.loginForm.controls['statut'].value;
      if (statut == "professor") {
        var dataForms = {
          "email": this.loginForm.controls['email'].value,
          "password": this.loginForm.controls['password'].value
        }
        this.authService.loginProfessor(dataForms).subscribe(
          (loggedData) => {
            if (loggedData.token) {
              console.log("Professor logged in");
              localStorage.setItem("token", loggedData.token);
              localStorage.setItem("currentstatus", "professor");
              this.router.navigateByUrl(`/professor/dashboard`);
            }
          },
          (error: ErrorTracker) => {
            if (error.errorNumber == 400) {
              error.userMessage = "Email ou mot de passe incorrect ! "
            }
            let snackBarData = {
              snackBar: this._snackBar,
              message: error.userMessage,
              action: "OK",
              status: "warning"
            }
            this.designUtilService.openSnackBar(snackBarData)
            this.loginForm.reset();
          }
        )
      }
      else if (statut == "student") {
        var dataForms = {
          "email": this.loginForm.controls['email'].value,
          "password": this.loginForm.controls['password'].value
        }
        this.authService.loginStudent(dataForms).subscribe(
          (loggedData) => {
            if (loggedData.token) {
              console.log("Student logged in");
              localStorage.setItem("token", loggedData.token);
              localStorage.setItem("currentstatus", "student");
              this.router.navigateByUrl(`/student/dashboard`);
            }
          },
          (error: ErrorTracker) => {
            if (error.errorNumber == 400) {
              error.userMessage = "Email ou mot de passe incorrect ! "
            }
            let snackBarData = {
              snackBar: this._snackBar,
              message: error.userMessage,
              action: "OK",
              status: "warning"
            }
            this.designUtilService.openSnackBar(snackBarData)
            this.loginForm.reset();
          }
        )
      }
    }
  }

}
