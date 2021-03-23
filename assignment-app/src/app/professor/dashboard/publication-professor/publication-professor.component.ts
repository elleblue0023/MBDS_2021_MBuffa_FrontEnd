import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorTracker } from 'src/app/models/error-tracker';

import { DesignUtilService } from 'src/app/services/design-util.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IPublication } from 'src/interfaces/publication';


@Component({
  selector: 'app-publication-professor',
  templateUrl: './publication-professor.component.html',
  styleUrls: ['./publication-professor.component.scss']
})
export class PublicationProfessorComponent implements OnInit {

  panelOpenState = false;

  myOccupation: any;
  currentProfessor: any;
  myPublications: IPublication[] = [];
  addPublicationForm: FormGroup;

  message: string = "";


  constructor(
    private router: Router,
    private designUtilService: DesignUtilService,
    private professorService: ProfessorService,
    private _snackBar: MatSnackBar,
    private utilsService: UtilsService
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

  getCurrentProfessor() {
    this.professorService.getCurrentProfessor().subscribe(
      (current) => {        
        this.currentProfessor = current;
        this.myOccupation = this.currentProfessor.occupation;
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
    this.getCurrentProfessor();
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

}
