import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studialog-assigndetail',
  templateUrl: './studialog-assigndetail.component.html',
  styleUrls: ['./studialog-assigndetail.component.scss']
})
export class StudialogAssigndetailComponent implements OnInit {

  data: any;
  action: string = "";
  component: string = "";

  constructor(
    public _dialogRef: MatDialogRef<StudialogAssigndetailComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any
  ) { }

  ngOnInit(): void {
    this.data = this.dataDialog.data;
    this.action = this.dataDialog.action;
    this.component = this.dataDialog.component;
  }

}
