import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { ErrorTracker } from 'src/app/models/error-tracker';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { StudentService } from 'src/app/services/student.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IAssignment } from 'src/interfaces/assignment';
import { IPublication } from 'src/interfaces/publication';
import { StudialogAssigndetailComponent } from './studialog-assigndetail/studialog-assigndetail.component';

@Component({
  selector: 'app-stupubliandassign',
  templateUrl: './stupubliandassign.component.html',
  styleUrls: ['./stupubliandassign.component.scss']
})
export class StupubliandassignComponent implements OnInit {

  myPublications: IPublication[] = [];
  myAssignments: IAssignment[] = [];
  currentStudent: any;
  itemSelected: any;
  formulaireToShow: Boolean = false;
  addAssignmentForm: FormGroup;
  titleSelected: String = "";
  isWait: Boolean = false;
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  ACTION = "detail";
  COMPONENT = "assign-detail";

  @ViewChild("scroller")
  scroller!: CdkVirtualScrollViewport;

  constructor(
    private router: Router,
    private designUtilService: DesignUtilService,
    private studentService: StudentService,
    private _snackBar: MatSnackBar,
    private utilsService: UtilsService,
    private ngZone: NgZone,
    private _dialog: MatDialog
  ) {
    this.addAssignmentForm = new FormGroup({
      depositUrl: new FormControl('', [Validators.required, Validators.pattern(this.reg)])
    })
   }

  ngOnInit(): void {
    this.studentService.getCurrentStudent().subscribe(
      (current) => {   
        this.currentStudent = current;
        console.log(this.currentStudent);
        this.listPromotionPublications(this.currentStudent.promotionName);
      }
    )
    this.itemSelected = null;
    this.formulaireToShow = false;
  }

  ngAfterViewInit() {
    this.scroller
      .elementScrolled()
      .pipe(
        map((event) => {
          return this.scroller.measureScrollOffset("bottom");
        }),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 200),
        throttleTime(200)
      )
      .subscribe((dist) => {
        this.ngZone.run(() => {
            this.getPublicationForScrolling();
        });
      });
  }

  listPromotionPublications(promo: String) {
    this.isWait = true;
    this.studentService.getPromotionPublications(promo).subscribe(
      (publications) => {
        if (publications instanceof Array) {
          this.myPublications = publications;
        }
        this.listAssignments();
      },
      (error: ErrorTracker) => {
        let snackBarData = {
          snackBar: this._snackBar,
          message: error.userMessage,
          action: "OK",
          status: "warning"
        };
        this.designUtilService.openSnackBar(snackBarData);
        this.isWait = false;
      }
    )
  }

  listAssignments() {
    this.studentService.getStudentAssignment().subscribe(
      (assignments) => {
        if (assignments instanceof Array) {
          this.myAssignments = assignments;
        }
        console.log(this.myAssignments);
        if(this.myAssignments.length > 0){
          for(let assignment of this.myAssignments){
            let publicationassign = this.myPublications.find(x => x._id === assignment.publication._id);
            if(publicationassign != null){
              publicationassign.assignmentStudentCreated = true;
            }
          }
        }
        this.isWait = false;
      },
      (error: ErrorTracker) => {
        let snackBarData = {
          snackBar: this._snackBar,
          message: error.userMessage,
          action: "OK",
          status: "warning"
        };
        this.designUtilService.openSnackBar(snackBarData);
        this.isWait = false;
      }
    )
  }

  closeAddAssignmentForm(){
    this.itemSelected = null;
    this.formulaireToShow = false;
  }

  openAddAssignmentForm(item: any){
    this.itemSelected = item;
    this.formulaireToShow = true;
    this.titleSelected = this.itemSelected.name;
  }

  onAddAssignment() {
    if (this.addAssignmentForm.valid) {
      this.isWait = true;
      let params = {
        publicationid : this.itemSelected._id,
        doneDate : new Date(),
        name : this.itemSelected.name,
        depositUrl : this.addAssignmentForm.controls["depositUrl"].value,
        note: 0,
        remark: "",
        isMarked: false
      } 

        this.studentService.saveAssignmentForCurrStu(params).subscribe(
          (studentData) => {
            let snackBarData = {
              snackBar: this._snackBar,
              message: "Création du devoir avec succès",
              action: "OK",
              status: "success"
            }
            this.designUtilService.openSnackBar(snackBarData);
            this.listPromotionPublications(this.currentStudent.promotionName);
            this.formulaireToShow = false;
            this.addAssignmentForm.reset();
          },
          (error: ErrorTracker) => {
            let snackBarData = {
              snackBar: this._snackBar,
              message: error.userMessage,
              action: "OK",
              status: "warning"
            }
            this.designUtilService.openSnackBar(snackBarData);
            this.isWait = false;
          }
        )
    }
        
  }

  getPublicationForScrolling() {
    this.studentService.getPromotionPublications(this.currentStudent.promotionName)
      .subscribe((publications) => {
        if (publications instanceof Array) {
          if(this.myAssignments.length > 0){
            for(let assignment of this.myAssignments){
              let publicationassign = publications.find(x => x._id === assignment.publication._id);
              if(publicationassign != null){
                publicationassign.assignmentStudentCreated = true;
              }
            }
          }
          this.myPublications = this.myPublications.concat(publications);
        }
      },
      (error: ErrorTracker) => {
        let snackBarData = {
          snackBar: this._snackBar,
          message: error.userMessage,
          action: "OK",
          status: "warning"
        };
        this.designUtilService.openSnackBar(snackBarData);
        this.isWait = false;
      });
  }

  openDialogAssignDetails(assignment: any){
    let dialogData = {
      _dialog: this._dialog,
      action: this.ACTION,
      component: this.COMPONENT,
      data: assignment
    }
    this.openDialog(dialogData);
  }

  openDialog(inputDialogData: any) {
    const dialogRef = inputDialogData._dialog.open(StudialogAssigndetailComponent, {
      width: '100%',
      padding: '5px',
      data: inputDialogData
    });
  }

}
