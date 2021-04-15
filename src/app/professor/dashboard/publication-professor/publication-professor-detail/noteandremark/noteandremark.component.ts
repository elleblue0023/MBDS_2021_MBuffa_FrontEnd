import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noteandremark',
  templateUrl: './noteandremark.component.html',
  styleUrls: ['./noteandremark.component.scss']
})
export class NoteandremarkComponent implements OnInit {

  note: number = 0;
  remark: string = "";


  constructor(
    public _dialogRef: MatDialogRef<NoteandremarkComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any
  ) { }

  ngOnInit(): void {
  }

  onEditAssignmentProfessor() {
      this._dialogRef.close({ note: this.note, remark:this.remark });
  }

}
