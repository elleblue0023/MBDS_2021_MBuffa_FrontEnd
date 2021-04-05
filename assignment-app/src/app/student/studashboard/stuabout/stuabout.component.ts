import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorTracker } from 'src/app/models/error-tracker';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { StudentService } from 'src/app/services/student.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IPromotion } from 'src/interfaces/promotion';

@Component({
  selector: 'app-stuabout',
  templateUrl: './stuabout.component.html',
  styleUrls: ['./stuabout.component.scss']
})
export class StuaboutComponent implements OnInit {

  panelOpenState = false;

  currentStudent: any = undefined;

  name: string = "";
  lastname: string = "";
  surname: string = "";
  email: string = ""; 
  promotionName: string = ""; 
  selectedPromotion: string = ""; 

  promotionsList: IPromotion[] = [];

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(
    public studentService: StudentService,
    public _snackBar: MatSnackBar,
    private utilsService: UtilsService,
    public designUtilService: DesignUtilService,
  ) { }

  ngOnInit(): void {
    this.studentService.getCurrentStudent().subscribe(
      (current) => {   
        this.currentStudent = current;
        this.name = current.lastname + ' '+ current.surname;
        this.lastname = current.lastname;
        this.surname = current.surname;
        this.email = current.email;
        this.promotionName = current.promotionName;
        this.selectedPromotion = this.promotionName;
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
        id: this.currentStudent._id,
        email: event.target.email.value
      }
      this.studentService.updateStudent(emailData).subscribe(
        (updatedData) => {
          this.studentService.behaviourCurrentStudent.next(updatedData.data);
          let snackBarData = {
            snackBar: this._snackBar,
            message: "Email modifié avec succès",
            action: "OK",
            status: "success"
          }
          this.designUtilService.openSnackBar(snackBarData);
          this.accordion.closeAll();
          this.email = event.target.email.value;
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
        message: "Veuillez renseigner un email valide",
        action: "OK",
        status: "warning"
      }
      this.designUtilService.openSnackBar(snackBarData);
    }
  }

  onUpdateName(event) {
    if (event.target.lastname.value && event.target.surname.value) {
      let namesData = {
        id: this.currentStudent._id,
        lastname: event.target.lastname.value,
        surname: event.target.surname.value
      }
      this.studentService.updateStudent(namesData).subscribe(
        (updatedData) => {
          this.studentService.behaviourCurrentStudent.next(updatedData.data);
          let snackBarData = {
            snackBar: this._snackBar,
            message: "Nom et prénom modifiés avec succès",
            action: "OK",
            status: "success"
          }
          this.designUtilService.openSnackBar(snackBarData);
          this.accordion.closeAll();
          this.name = event.target.lastname.value + ' '+ event.target.surname.value;
          this.lastname = event.target.lastname.value;
          this.surname = event.target.surname.value;
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
        message: "Veuillez renseigner un nom et prénom valide",
        action: "OK",
        status: "warning"
      }
      this.designUtilService.openSnackBar(snackBarData);
    }
  }

  onUpdatePromotion(event) {
    if (this.selectedPromotion) {
      let namesData = {
        id: this.currentStudent._id,
        promotionName: this.selectedPromotion,
      }
      this.studentService.updateStudent(namesData).subscribe(
        (updatedData) => {
          this.studentService.behaviourCurrentStudent.next(updatedData.data);
          let snackBarData = {
            snackBar: this._snackBar,
            message: "Promotion modifiée avec succès",
            action: "OK",
            status: "success"
          }
          this.designUtilService.openSnackBar(snackBarData);
          this.accordion.closeAll();
          this.promotionName = this.selectedPromotion;
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
        message: "Veuillez renseigner une promotion un valide",
        action: "OK",
        status: "warning"
      }
      this.designUtilService.openSnackBar(snackBarData);
    }
  }

}
