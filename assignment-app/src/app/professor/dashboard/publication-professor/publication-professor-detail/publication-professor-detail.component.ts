import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAssignment } from 'src/interfaces/assignment';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AssignementService } from 'src/app/services/assignement.service';
import { Assignment } from 'src/app/models/assignment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-publication-professor-detail',
  templateUrl: './publication-professor-detail.component.html',
  styleUrls: ['./publication-professor-detail.component.scss']
})
export class PublicationProfessorDetailComponent implements OnInit {

  @Input() markedAssignment: IAssignment[] = [];
  @Input() unMarkedAssignment: IAssignment[] = [];

  @Output() markAssignment = new EventEmitter<Assignment>();


  currentAssignment: any;
  currentNoteAssignment: Number = 0;
  currentRemarkAssignment: string ="";


  markedAssignmentList: IAssignment[] = [];
  unMarkedAssignmentList: IAssignment[] = [];

  unMarkedAssignmentCount: any;
  markedAssignmentCount: any;


  constructor() { }

  ngOnInit(): void {
    this.markedAssignmentList = this.markedAssignment;
    this.unMarkedAssignmentList = this.unMarkedAssignmentList;
    this.unMarkedAssignmentCount = this.unMarkedAssignmentList.length;
    this.markedAssignmentCount = this.markedAssignmentList.length;
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
  } 

  onEditCurrentAssignment(assignment) {
    this.currentAssignment = assignment;
  }

  onEdit(idAssignment) {
    if (this.currentNoteAssignment!=0 && this.currentRemarkAssignment!="") {
      let newAssignment: Assignment = {
        id: idAssignment,
        isMarked: true,
        note: +this.currentNoteAssignment,
        remark: this.currentRemarkAssignment
      }
      this.markAssignment.emit(newAssignment);
      this.currentNoteAssignment = 0;
      this.currentRemarkAssignment = "";
    } 
  }
}



