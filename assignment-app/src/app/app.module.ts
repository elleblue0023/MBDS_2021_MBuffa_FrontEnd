import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { AddProfessorComponent } from './add-professor/add-professor.component';

/** Import des modules angular */
import { ReactiveFormsModule } from '@angular/forms';
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

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AddHeaderInterceptor } from '../interceptor/add-header.interceptor';


/** Services */
import { ErrorService } from './services/error.service';

const routes:Routes = [
  {
    path:'',
    component: AuthComponent
  }, {
    path: 'professor/create-account',
    component: AddProfessorComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AddProfessorComponent
  ],
  imports: [
    BrowserModule,
    
    ReactiveFormsModule, 
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

    BrowserAnimationsModule,
    HttpClientModule,

    RouterModule.forRoot(routes)

  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorService },
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
