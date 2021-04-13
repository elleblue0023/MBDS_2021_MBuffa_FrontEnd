import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfessorService } from 'src/app/services/professor.service';

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
    this.professorService.openLogOutDialog(data)
  }
}