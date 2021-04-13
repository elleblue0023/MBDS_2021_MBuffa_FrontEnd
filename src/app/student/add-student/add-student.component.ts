import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorTracker } from 'src/app/models/error-tracker';
import { Student } from 'src/app/models/student';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { StudentService } from 'src/app/services/student.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ICourse } from 'src/interfaces/course';
import { IPromotion } from 'src/interfaces/promotion';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddStudentComponent implements OnInit {

  addStudentForm: FormGroup;

  promotionsList: IPromotion[] = [];

  constructor(
    private router: Router,
    private designUtilService: DesignUtilService,
    private utilsService: UtilsService,
    private studentService: StudentService,
    private _snackBar: MatSnackBar
  ) {
    this.addStudentForm = new FormGroup({
      lastname: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      promotion : new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
     this.utilsService.getAllPromotion().subscribe(
       (dataPromotions) => {
         if (dataPromotions instanceof Array) {
           this.promotionsList = dataPromotions
         }
        },
       (error: ErrorTracker) => {
        let snackBarData = {
          snackBar: this._snackBar,
          message: error.userMessage,
          action: "OK",
          status: "warning"
        }
        this.designUtilService.openSnackBar(snackBarData)
       }
      )
  }

  onAddStudent() {
    if (this.addStudentForm.valid) {
      
        let newStudent = new Student();
        newStudent.lastname = this.addStudentForm.controls['lastname'].value;
        newStudent.surname = this.addStudentForm.controls['surname'].value;
        newStudent.email = this.addStudentForm.controls['email'].value;
        newStudent.password = this.addStudentForm.controls['password'].value;
        newStudent.promotionName = this.addStudentForm.controls['promotion'].value;

        this.studentService.saveStudent(newStudent).subscribe(
          (studentData) => {
            let snackBarData = {
              snackBar: this._snackBar,
              message: "Création de compte avec succès",
              action: "OK",
              status: "success"
            }
            this.designUtilService.openSnackBar(snackBarData)
            this.router.navigateByUrl('/');
          },
          (error: ErrorTracker) => {
            let snackBarData = {
              snackBar: this._snackBar,
              message: error.userMessage,
              action: "OK",
              status: "warning"
            }
            this.designUtilService.openSnackBar(snackBarData)
            this.addStudentForm.reset();
          }
        )
      
    } else {
      this.designUtilService.openSnackBarFillForms(this._snackBar);
    }
  }

}
