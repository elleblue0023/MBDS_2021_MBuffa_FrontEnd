import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ErrorTracker } from 'src/app/models/error-tracker';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ICourse } from 'src/interfaces/course';
import { IPromotion } from 'src/interfaces/promotion';


@Component({
  selector: 'app-about-dashboard',
  templateUrl: './about-dashboard.component.html',
  styleUrls: ['./about-dashboard.component.scss']
})
export class AboutDashboardComponent implements OnInit{

  panelOpenState = false;

  myOccupation: any = undefined;
  currentProfessor: any = undefined;

  name: string = "";
  email: string = ""; 

  coursesList: ICourse[] = [];
  promotionsList: IPromotion[] = [];
  occupationList: any[] = [];

  coursValue = "";
  promotionValue = "";


  
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(
    public professorService: ProfessorService,
    public _snackBar: MatSnackBar,
    private utilsService: UtilsService,
    public designUtilService: DesignUtilService,
  ) {}


  ngOnInit(): void {
    this.professorService.getCurrentProfessor().subscribe(
      (current) => {   
        this.currentProfessor = current;
        this.name = current.lastname + ' '+ current.surname;
        this.email = current.email;
        this.myOccupation = current.occupation;
      }
    )

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


  onUpdateEmail(event) {
    if (event.target.email.value) {
      let emailData = {
        id: this.currentProfessor._id,
        email: event.target.email.value
      }
      this.professorService.updateProfessor(emailData).subscribe(
        (updatedData) => {
          this.professorService.behaviourCurrentProfessor.next(updatedData.data);
          let snackBarData = {
            snackBar: this._snackBar,
            message: "Email modifi?? avec succ??s",
            action: "OK",
            status: "success"
          }
          this.designUtilService.openSnackBar(snackBarData);
          this.accordion.closeAll();
        },
        (error: ErrorTracker) => {
          let snackBarData = {
            snackBar: this._snackBar,
            message: error.userMessage,
            action: "OK",
            status: "warning"
          }
          this.designUtilService.openSnackBar(snackBarData);
        } 
      ) 
    } else {
      let snackBarData = {
        snackBar: this._snackBar,
        message: "Veuillez renssigner un email valide",
        action: "OK",
        status: "warning"
      }
      this.designUtilService.openSnackBar(snackBarData);
    }
  }

  onUpdateName(event) {
    if (event.target.lastname.value && event.target.surname.value) {
      let namesData = {
        id: this.currentProfessor._id,
        lastname: event.target.lastname.value,
        surname: event.target.surname.value
      }
      this.professorService.updateProfessor(namesData).subscribe(
        (updatedData) => {
          this.professorService.behaviourCurrentProfessor.next(updatedData.data);
          let snackBarData = {
            snackBar: this._snackBar,
            message: "Nom et pr??nom modifi??s avec succ??s",
            action: "OK",
            status: "success"
          }
          this.designUtilService.openSnackBar(snackBarData);
          this.accordion.closeAll();
        },
        (error: ErrorTracker) => {
          let snackBarData = {
            snackBar: this._snackBar,
            message: error.userMessage,
            action: "OK",
            status: "warning"
          }
          this.designUtilService.openSnackBar(snackBarData);
        } 
      ) 
    } else {
      let snackBarData = {
        snackBar: this._snackBar,
        message: "Veuillez renssigner un email valide",
        action: "OK",
        status: "warning"
      }
      this.designUtilService.openSnackBar(snackBarData);
    }
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
    if (this.coursValue === "" || this.promotionValue === "") {
      this.emptyOccupation();
    } else {
      let newOccupation = {
        course: this.coursValue,
        promotion: this.promotionValue
      }
      this.occupationList.push(newOccupation);
      // console.log(this.occupationList);
      let result = this.utilsService.checkIfOccupationExist(this.occupationList, newOccupation);
      console.log(result);
    }
  }
}
