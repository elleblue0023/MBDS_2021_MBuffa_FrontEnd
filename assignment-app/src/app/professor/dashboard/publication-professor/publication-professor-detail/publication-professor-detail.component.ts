import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorTracker } from 'src/app/models/error-tracker';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { IAssignment } from 'src/interfaces/assignment';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-publication-professor-detail',
  templateUrl: './publication-professor-detail.component.html',
  styleUrls: ['./publication-professor-detail.component.scss']
})
export class PublicationProfessorDetailComponent implements OnInit {

  @Input() markedAssignment: IAssignment[] = [];
  @Input() unMarkedAssignment: IAssignment[] = [];


  markedAssignmentList: IAssignment[] = [];
  unMarkedAssignmentList: IAssignment[] = [];


  constructor( 
    private professorService: ProfessorService,
    private _snackBar: MatSnackBar,
    private designUtilService: DesignUtilService
  ) { }

  ngOnInit(): void {
    this.markedAssignmentList = this.markedAssignment;
    this.unMarkedAssignmentList = this.unMarkedAssignmentList;
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
    let assignment = event.previousContainer.data[event.previousIndex]
    console.log(assignment._id);
    
  } 

}
