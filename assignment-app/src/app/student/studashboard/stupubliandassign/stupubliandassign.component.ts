import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorTracker } from 'src/app/models/error-tracker';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { StudentService } from 'src/app/services/student.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IAssignment } from 'src/interfaces/assignment';
import { IPublication } from 'src/interfaces/publication';

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

  constructor(
    private router: Router,
    private designUtilService: DesignUtilService,
    private studentService: StudentService,
    private _snackBar: MatSnackBar,
    private utilsService: UtilsService,
    private _dialog: MatDialog
  ) {
    this.addAssignmentForm = new FormGroup({
      depositUrl: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
    this.studentService.getCurrentStudent().subscribe(
      (current) => {   
        this.currentStudent = current;
        console.log(this.currentStudent);
        this.listPromotionPublications(this.currentStudent.promotionName);
        this.listAssignments();
      }
    )
    this.itemSelected = null;
    this.formulaireToShow = false;
  }

  listPromotionPublications(promo: String) {
    this.studentService.getPromotionPublications(promo).subscribe(
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

  listAssignments() {
    this.studentService.getStudentAssignment().subscribe(
      (assignments) => {
        if (assignments instanceof Array) {
          this.myAssignments = assignments;
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
      let params = {
        publicationid : this.itemSelected._id,
        doneDate : new Date(),
        name : this.itemSelected.name,
        depositUrl : this.addAssignmentForm.controls["depositUrl"].value.course,
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
            this.formulaireToShow = false;
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
