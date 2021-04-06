import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-studashboard',
  templateUrl: './studashboard.component.html',
  styleUrls: ['./studashboard.component.scss']
})
export class StudashboardComponent implements OnInit {

  currentStudent: any;

  constructor(
    private _logOutDialog: MatDialog,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.studentService.getCurrentStudent().subscribe(
      (current) => {   
        this.currentStudent = current;
      }
    )
  }

  OnLogOut() {
    let data = {
      _dialog: this._logOutDialog
    }
    this.studentService.openLogOutDialog(data)
  }

}
