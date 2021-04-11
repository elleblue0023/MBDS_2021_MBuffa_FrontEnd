import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorTracker } from 'src/app/models/error-tracker';

import { DesignUtilService } from 'src/app/services/design-util.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogPublicationProfessorComponent } from './dialog-publication-professor/dialog-publication-professor.component';
import { ViewEncapsulation } from '@angular/core';
import { IPublication } from 'src/interfaces/publication';
import { IAssignment } from 'src/interfaces/assignment';
import { AssignementService } from 'src/app/services/assignement.service';


@Component({
  selector: 'app-publication-professor',
  templateUrl: './publication-professor.component.html',
  styleUrls: ['./publication-professor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PublicationProfessorComponent implements OnInit {

  myOccupation: any;
  currentProfessor: any;
  myPublications: IPublication[] = [];
  //myPublications: any;
  addPublicationForm: FormGroup;

  ACTION = "edit";
  COMPONENT = "publication-professor";

  markedAssignment: IAssignment[] = [];
  unMarkedAssignment: IAssignment[] = [];


  constructor(
    private router: Router,
    private designUtilService: DesignUtilService,
    private professorService: ProfessorService,
    private assignmentService: AssignementService,
    private _snackBar: MatSnackBar,
    private utilsService: UtilsService,
    private _dialog: MatDialog
  ) {
    /**Initialisation de la form Group */
    this.addPublicationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      promotionCours: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required)
    })
  }

  listPublications() {
    this.professorService.getProfessorPublication().subscribe(
      (publications) => {
        if (publications instanceof Array) {
          publications.forEach(elt => {
            elt.isOutofDate = this.utilsService.isValidDeadline(new Date(elt.deadline));
          });
          this.myPublications = publications;
          this.professorService.publicationCount.next(this.myPublications.length);
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
        name : this.addPublicationForm.controls["name"].value,
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

  onUpdateIdPublicationDetail(id) {
    this.professorService.getAssignmentListPublication(id).subscribe(
      (list) => {
        if (list instanceof Array) {
          let markedList: IAssignment[] = [];
          let unMarkedList: IAssignment[] = [];

          list.forEach(elt => {
            if (elt.publication != null) {
              (elt.isMarked) ? markedList.push(elt) : unMarkedList.push(elt)
            }
          });

          this.markedAssignment = markedList;
          this.unMarkedAssignment = unMarkedList;
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
  
  onMarkAssignment(assignment) {
    this.assignmentService.updateAssignement(assignment).subscribe(
      (data) => {
        this.onUpdateIdPublicationDetail(assignment.id);
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
