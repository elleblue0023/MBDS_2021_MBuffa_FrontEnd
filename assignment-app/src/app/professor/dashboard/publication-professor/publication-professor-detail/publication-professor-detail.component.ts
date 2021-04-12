import { Component, OnInit } from '@angular/core';
import { IAssignment } from 'src/interfaces/assignment';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AssignementService } from 'src/app/services/assignement.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorTracker } from 'src/app/models/error-tracker';
import { ProfessorService } from 'src/app/services/professor.service';
import { Assignment } from 'src/app/models/assignment';

@Component({
  selector: 'app-publication-professor-detail',
  templateUrl: './publication-professor-detail.component.html',
  styleUrls: ['./publication-professor-detail.component.scss']
})
export class PublicationProfessorDetailComponent implements OnInit {

  publicationId: any;
  currentAssignment: any;
  currentNoteAssignment: Number = 0;
  currentRemarkAssignment: string ="";


  markedAssignmentList: IAssignment[] = [];
  unMarkedAssignmentList: IAssignment[] = [];

  unMarkedAssignmentCount: any;
  markedAssignmentCount: any;

  currentProfessor: any;

  constructor(
    private designUtilService: DesignUtilService,
    private _snackBar: MatSnackBar,
    private utilsService: UtilsService,
    private professorService: ProfessorService,
    private assignmentService: AssignementService,
    private activatedRoute: ActivatedRoute
  ) { }


  publicationAssignmentList(publicationId) {
    this.professorService.getAssignmentListPublication(publicationId).subscribe(
      (list) => {
        if (list instanceof Array) {
          list.forEach(elt => {
            if (elt.publication != null) {
              (elt.isMarked) ? this.markedAssignmentList.push(elt) : this.unMarkedAssignmentList.push(elt)
            }
          });
          this.unMarkedAssignmentCount = this.unMarkedAssignmentList.length;          
          this.markedAssignmentCount = this.markedAssignmentList.length;
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
      }
    )

    this.publicationId = this.activatedRoute.snapshot.params.publicationId;
    this.publicationAssignmentList(this.publicationId);
  }

  drop(event: CdkDragDrop<IAssignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      this.markAssignement(event);
      
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  markAssignement(event) {
    let assignment = event.previousContainer.data[event.previousIndex];

    let newAssignment: Assignment = {
      id: assignment._id,
      isMarked: true
    }

    this.assignmentService.updateAssignement(newAssignment).subscribe(
      (data) => {
        this.utilsService.redirectTo(`/professor/mark-assignment/${this.publicationId}`);
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
    
  } 

  onEditCurrentAssignment(assignment) {
    this.currentAssignment = assignment;
  }

  

  onEdit(idAssignment) {
    if (this.currentNoteAssignment!=0 && this.currentRemarkAssignment!="") {
      let newAssignment: Assignment = {
        id: idAssignment,
        isMarked: false,
        note: +this.currentNoteAssignment,
        remark: this.currentRemarkAssignment
      }
      this.assignmentService.updateAssignement(newAssignment).subscribe(
        (data) => {
          this.currentNoteAssignment = 0;
          this.currentRemarkAssignment = "";
          this.utilsService.redirectTo(`/professor/mark-assignment/${this.publicationId}`);
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
    } 
  }
}



