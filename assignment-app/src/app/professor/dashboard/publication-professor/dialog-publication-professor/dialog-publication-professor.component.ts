import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-publication-professor.component.html',
  styleUrls: ['./dialog-publication-professor.component.scss']
})
export class DialogPublicationProfessorComponent implements OnInit {

  data: any;
  action: string = "";
  component: string = "";

  dataEditProfessorPublication = {
    id: "",
    message: ""
  }


  constructor(
    public _dialogRef: MatDialogRef<DialogPublicationProfessorComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any
  ) { }

  ngOnInit(): void {
    this.data = this.dataDialog.data;
    this.action = this.dataDialog.action;
    this.component = this.dataDialog.component;
  }

  onEditPublicationProfessor() {
    this.dataEditProfessorPublication.id = this.data._id;
    this.dataEditProfessorPublication.message = this.data.message;
    this._dialogRef.close(this.dataEditProfessorPublication);
  }
}
