import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorTracker } from './models/error-tracker';
import { DesignUtilService } from './services/design-util.service';
import { ProfessorService } from './services/professor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'assignment-app';
}

