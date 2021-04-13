import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-publication-professor.component.html',
  styleUrls: ['./dialog-publication-professor.component.scss']
})
export class DialogPublicationProfessorComponent implements OnInit {

  data: any;
  action: string = "";
  component: string = "";


  formEditDialog: FormGroup | undefined;
  
  constructor(
    public _dialogRef: MatDialogRef<DialogPublicationProfessorComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any
  ) { 
  }

  ngOnInit(): void {
    this.data = this.dataDialog.data;
    this.action = this.dataDialog.action;
    this.component = this.dataDialog.component;

    this.formEditDialog = new FormGroup({
      id: new FormControl(this.data._id),
      name: new FormControl(this.data.name, Validators.required),
      message: new FormControl(this.data.message, Validators.required),
      deadline: new FormControl(this.data.deadline, Validators.required)
    })
  }

  onEditPublicationProfessor() {
    if (this.formEditDialog?.valid) {
      this._dialogRef.close(this.formEditDialog?.value);
    }
  }
}
