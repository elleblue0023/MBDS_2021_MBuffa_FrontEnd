import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/** Import des modules angular */
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AddHeaderInterceptor } from '../interceptor/add-header.interceptor';


/** Services */
import { ErrorService } from './services/error.service';


import { AuthComponent } from './auth/auth.component';
import { AddProfessorComponent } from './professor/add-professor/add-professor.component';
import { PublicationProfessorComponent } from './professor/dashboard/publication-professor/publication-professor.component';
import { AboutDashboardComponent } from './professor/dashboard/about-dashboard/about-dashboard.component';
import { DashboardProfessorComponent } from './professor/dashboard/dashboard-professor/dashboard-professor.component';
import { DialogPublicationProfessorComponent } from './professor/dashboard/publication-professor/dialog-publication-professor/dialog-publication-professor.component';
import { DialogLogoutComponent } from './professor/dashboard/dialog-logout/dialog-logout.component';
import { AuthGuard } from './services/auth.guard';
import { ConvertmonthDatePipe } from './pipes/convert-monthDate.pipe';
import { CheckLateDatePipe } from './pipes/check-late-date.pipe';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { StudashboardComponent } from './student/studashboard/studashboard.component';
import { StudialogLogoutComponent } from './student/studashboard/studialog-logout/studialog-logout.component';
import { StuaboutComponent } from './student/studashboard/stuabout/stuabout.component';
import { PublicationProfessorDetailComponent } from './professor/dashboard/publication-professor/publication-professor-detail/publication-professor-detail.component';
import { StupubliandassignComponent } from './student/studashboard/stupubliandassign/stupubliandassign.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';




const routes:Routes = [
  {
    path:'',
    component: AuthComponent
  }, {
    path: 'professor/create-account',
    component: AddProfessorComponent
  }, {
    path: 'professor/dashboard',
    component: DashboardProfessorComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'student/create-account',
    component: AddStudentComponent
  }, {
    path: 'student/dashboard',
    component: StudashboardComponent,
    canActivate: [AuthGuard]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AddProfessorComponent,
    PublicationProfessorComponent,
    DashboardProfessorComponent,
    AboutDashboardComponent,
    DialogPublicationProfessorComponent,
    DialogLogoutComponent,
    ConvertmonthDatePipe,
    CheckLateDatePipe,
    AddStudentComponent,
    StudashboardComponent,
    StudialogLogoutComponent,
    StuaboutComponent,
    PublicationProfessorDetailComponent,
    StupubliandassignComponent
  ],
  imports: [
    BrowserModule,
    
    ReactiveFormsModule, 
    FormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDialogModule,
    MatTooltipModule,

    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    DragDropModule,

    RouterModule.forRoot(routes)

  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorService },
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
