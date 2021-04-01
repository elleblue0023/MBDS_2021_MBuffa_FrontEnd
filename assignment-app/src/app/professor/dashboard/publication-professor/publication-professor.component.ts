import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorTracker } from 'src/app/models/error-tracker';

import { DesignUtilService } from 'src/app/services/design-util.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IPublication } from 'src/interfaces/publication';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';
import { DialogPublicationProfessorComponent } from './dialog-publication-professor/dialog-publication-professor.component';


@Component({
  selector: 'app-publication-professor',
  templateUrl: './publication-professor.component.html',
  styleUrls: ['./publication-professor.component.scss']
})
export class PublicationProfessorComponent implements OnInit {

  myOccupation: any;
  currentProfessor: any;
  myPublications: IPublication[] = [];
  addPublicationForm: FormGroup;

  message: string = "";
  currentDate: Date = new Date();

  editedMessage: string = "";

  ACTION = "edit";
  COMPONENT = "publication-professor";

  constructor(
    private router: Router,
    private designUtilService: DesignUtilService,
    private professorService: ProfessorService,
    private _snackBar: MatSnackBar,
    private utilsService: UtilsService,
    private _dialog: MatDialog
  ) {
    this.addPublicationForm = new FormGroup({
      message: new FormControl('', Validators.required),
      promotionCours: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required)
    })
   }


  listPublications() {
    this.professorService.getProfessorPublication().subscribe(
      (publications) => {
        if (publications instanceof Array) {
          this.myPublications = publications;
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

  isValidDeadline(date: Date) {
    return date.setHours(0,0,0,0) > new Date().setHours(0,0,0,0)
  };

  ngOnInit(): void {
    this.professorService.getCurrentProfessor().subscribe(
      (current) => {   
        this.currentProfessor = current;
        this.myOccupation = this.currentProfessor.occupation;
      }
    )

    this.listPublications();
  }

  onAddPublication() {
    if (this.addPublicationForm.valid) {
      let params = {
        message : this.addPublicationForm.controls["message"].value,
        promotion : this.addPublicationForm.controls["promotionCours"].value.promotion,
        course : this.addPublicationForm.controls["promotionCours"].value.course,
        deadline : this.utilsService.formatDate(this.addPublicationForm.controls["deadline"].value)
      } 

      this.professorService.savePublication(params).subscribe(
        (publicationData) => {
          let snackBarData = {
            snackBar: this._snackBar,
            message: "Publication d'un projet avec succès",
            action: "OK",
            status: "success"
          }
          this.designUtilService.openSnackBar(snackBarData);
          this.listPublications();
          this.addPublicationForm.reset();
        },
        (error: ErrorTracker) => {
          let snackBarData = {
            snackBar: this._snackBar,
            message: error.userMessage,
            action: "OK",
            status: "warning"
          }
          this.designUtilService.openSnackBar(snackBarData)
          this.addPublicationForm.reset();
        }
      )
    }
  }


  openDialog(inputDialogData: any) {
    const dialogRef = inputDialogData._dialog.open(DialogPublicationProfessorComponent, {
      width: '100%',
      padding: '5px',
      data: inputDialogData
    });

    dialogRef.afterClosed().subscribe(formEditDialogData => {
      this.professorService.updatePublication(formEditDialogData).subscribe(
        (data) => {
          let snackBarData = {
            snackBar: this._snackBar,
            message: "Modification avec succès de la publication",
            action: "OK",
            status: "success"
          }
          this.designUtilService.openSnackBar(snackBarData) 
          this.listPublications();
        }
      )
    });
  }

  openDialogEditPublication(id: any) {
    this.professorService.getCurrentPublication(id).subscribe(
      (currentDataPublication) => {        
        const dialogData = {
          _dialog: this._dialog,
          action: this.ACTION,
          component: this.COMPONENT,
          data: currentDataPublication
        }
        this.openDialog(dialogData);
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
