import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorTracker } from 'src/app/models/error-tracker';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { StudentService } from 'src/app/services/student.service';
import { IStudent } from 'src/interfaces/student';

@Component({
  selector: 'app-divers-professor',
  templateUrl: './divers-professor.component.html',
  styleUrls: ['./divers-professor.component.scss']
})
export class DiversProfessorComponent implements OnInit {

  mbdsList: IStudent[] = [];
  licenceList: IStudent[] = [];
  constructor(
    private studientService: StudentService,
    private _snackBar: MatSnackBar,
    private designUtilService: DesignUtilService
  ) { }


  getMbdsListStudent(promotion: string) {
    this.studientService.getStudientListByPromotion(promotion).subscribe(
      (list) => {
        if (list instanceof Array) {
          if (promotion == "MBDS") {
            this.mbdsList = list
            console.log("MBDS");
            console.log(list);
          } else {
            this.licenceList = list
            console.log("Licence");
            console.log(list);
          }
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
    this.getMbdsListStudent("MBDS");
    this.getMbdsListStudent("Licence");
  }

}
