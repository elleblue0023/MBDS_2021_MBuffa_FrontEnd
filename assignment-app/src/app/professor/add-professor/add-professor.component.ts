import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Course } from 'src/interfaces/course';
import { Promotion } from 'src/interfaces/promotion';
import { ErrorTracker } from '../../models/error-tracker';
import { Professor } from '../../models/professor';
import { DesignUtilService } from '../../services/design-util.service';
import { ProfessorService } from '../../services/professor.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.scss']
})
export class AddProfessorComponent implements OnInit {

  addProfessorForm: FormGroup;

  coursesList: Course[] = [];
  promotionsList: Promotion[] = [];

  occupationList: any[] = [];
  
  constructor(
    private router: Router,
    private designUtilService: DesignUtilService,
    private utilsService: UtilsService,
    private professorService: ProfessorService,
    private _snackBar: MatSnackBar
  ) { 
    this.addProfessorForm = new FormGroup({
      lastname: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      course : new FormControl('', [Validators.required]),
      promotion : new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.utilsService.getAllCourse().subscribe(
     (dataCourses) => {
       if (dataCourses instanceof Array) {
         this.coursesList = dataCourses
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

  emptyOccupation() {
    const message = "Veuillez choisir le cours et la promotion avant d'ajouter !";
      let snackBarData = {
        snackBar: this._snackBar,
        message: message,
        action: "OK",
        status: "warning"
      }
    this.designUtilService.openSnackBar(snackBarData)
  }

  onAddOccupation() {
    const courseValue = this.addProfessorForm.controls['course'].value;
    const promotionValue = this.addProfessorForm.controls['promotion'].value;
    if (courseValue === "" || promotionValue === "") {
      this.emptyOccupation();
    } else {
      let newOccupation = {
        course: courseValue,
        promotion: promotionValue
      }
      this.occupationList.push(newOccupation);
      console.log(this.occupationList);
    }
  }

  onDeleteOccupation(index: number) {
    this.occupationList.splice(index, 1);
  }

  onAddProfessor() {
    if (this.addProfessorForm.valid) {
      if (this.occupationList.length == 0) {
        this.emptyOccupation();
      } else {
        let newProfessor = new Professor();
        newProfessor.lastname = this.addProfessorForm.controls['lastname'].value;
        newProfessor.surname = this.addProfessorForm.controls['surname'].value;
        newProfessor.email = this.addProfessorForm.controls['email'].value;
        newProfessor.password = this.addProfessorForm.controls['password'].value;
        newProfessor.occupation = this.occupationList;

        this.professorService.saveProfessor(newProfessor).subscribe(
          (professorData) => {
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
            this.addProfessorForm.reset();
          }
        )
      }
    } else {
      this.designUtilService.openSnackBarFillForms(this._snackBar);
    }
  }

  
}
