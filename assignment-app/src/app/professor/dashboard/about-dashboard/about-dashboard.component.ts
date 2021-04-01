import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ErrorTracker } from 'src/app/models/error-tracker';
import { DesignUtilService } from 'src/app/services/design-util.service';
import { ProfessorService } from 'src/app/services/professor.service';


@Component({
  selector: 'app-about-dashboard',
  templateUrl: './about-dashboard.component.html',
  styleUrls: ['./about-dashboard.component.scss']
})
export class AboutDashboardComponent implements OnInit{

  myOccupation: any = undefined;
  currentProfessor: any = undefined;


  name: string = "";
  email: string = ""; 

  updateStatus = false;

  updateAboutForm: FormGroup | undefined;

  constructor(
    public professorService: ProfessorService,
    public _snackBar: MatSnackBar,
    public designUtilService: DesignUtilService,
  ) {}


  ngOnInit(): void {
    this.professorService.getCurrentProfessor().subscribe(
      (current) => {   
        this.currentProfessor = current;
        this.name = current.lastname + ' '+ current.surname;
        this.email = current.email;
        this.myOccupation = current.occupation;
      }
    )
  }

  updateAbout() {
    this.updateStatus = true;

    this.updateAboutForm = new FormGroup ({
      id: new FormControl(this.currentProfessor._id),
      lastname: new FormControl(this.currentProfessor.lastname, Validators.required),
      surname: new FormControl(this.currentProfessor.surname, Validators.required),
      email: new FormControl(this.currentProfessor.email, Validators.required)
    })
  }

  onUpdate() {
    if (this.updateAboutForm?.valid) {
      console.log(this.updateAboutForm.value);
      this.professorService.updateProfessor(this.updateAboutForm?.value).subscribe(
        (updatedData) => {
          let snackBarData = {
            snackBar: this._snackBar,
            message: "Modification avec succès",
            action: "OK",
            status: "success"
          }
          this.designUtilService.openSnackBar(snackBarData);
          this.professorService.initializeCurrentProfessor();
          this.updateStatus = false;
        },
        (error: ErrorTracker) => {
          let snackBarData = {
            snackBar: this._snackBar,
            message: error.userMessage,
            action: "OK",
            status: "warning"
          }
          this.designUtilService.openSnackBar(snackBarData);
          this.updateAboutForm?.reset();
        } 
      ) 
    }
  }
}
