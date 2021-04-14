import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfessorService } from 'src/app/services/professor.service';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';

@Component({
  selector: 'app-dashboard-professor',
  templateUrl: './dashboard-professor.component.html',
  styleUrls: ['./dashboard-professor.component.scss']
})
export class DashboardProfessorComponent implements OnInit {

  currentProfessor: any;
  publicationCount: any;

  constructor(
    private _logOutDialog: MatDialog,
    private router: Router,
    private professorService: ProfessorService,
  ) { }

  
  ngOnInit(): void {
    this.professorService.getCurrentProfessor().subscribe(
      (current) => {   
        this.currentProfessor = current;
        this.professorService.publicationCount.subscribe(count => this.publicationCount = count);
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
    const dialogRef = inputDialogData._dialog.open(DialogLogoutComponent, {
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