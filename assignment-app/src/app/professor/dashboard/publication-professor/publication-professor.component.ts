import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorTracker } from 'src/app/models/error-tracker';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Course } from 'src/interfaces/course';
import { Promotion } from 'src/interfaces/promotion';

@Component({
  selector: 'app-publication-professor',
  templateUrl: './publication-professor.component.html',
  styleUrls: ['./publication-professor.component.scss']
})
export class PublicationProfessorComponent implements OnInit {

  coursesList: Course[] = [];
  promotionsList: Promotion[] = [];
  constructor(
    private router: Router,
    private designUtilService: DesignUtilService,
    private utilsService: UtilsService,
    private professorService: ProfessorService,
    private _snackBar: MatSnackBar
  ) { }

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

}
