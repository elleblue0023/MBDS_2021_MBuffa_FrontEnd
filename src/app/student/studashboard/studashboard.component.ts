import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { StudialogLogoutComponent } from './studialog-logout/studialog-logout.component';

@Component({
  selector: 'app-studashboard',
  templateUrl: './studashboard.component.html',
  styleUrls: ['./studashboard.component.scss']
})
export class StudashboardComponent implements OnInit {

  currentStudent: any;

  constructor(
    private _logOutDialog: MatDialog,
    private router: Router,
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

    this.openLogOutDialog(data)
  }

  openLogOutDialog(inputDialogData: any) {
    const dialogRef = inputDialogData._dialog.open(StudialogLogoutComponent, {
      width: '35%',
      padding: '5px',
      data: inputDialogData
    });

    dialogRef.afterClosed().subscribe(logOutDialogData => {
      console.log(logOutDialogData);
      localStorage.removeItem('token');
      localStorage.removeItem('currentstatus');
      this.router.navigate(['']);
    });
  }

}
