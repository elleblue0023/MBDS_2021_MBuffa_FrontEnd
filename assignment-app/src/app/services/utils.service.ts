import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICourse } from 'src/interfaces/course';
import { IPromotion } from 'src/interfaces/promotion';
import { ErrorTracker } from '../models/error-tracker';
import { ErrorService } from './error.service';
import { formatDate } from "@angular/common";
import { ConfigurationService } from './configuration.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private confiService: ConfigurationService,
    private router: Router,
  ) { }

  private readonly uri = this.confiService.getApiUrl();

  getAllCourse() {
    return this.http.get<ICourse[]>(`${this.uri}/courses`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  getAllPromotion() {
    return this.http.get<IPromotion[]>(`${this.uri}/promotions`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  checkIfOccupationExist(occupation: any, checkList: any): Boolean {
    /* return occupation.forEach(elt => {
      console.log("OccupationArray");
      console.log(elt['course'] +' => '+ elt['promotion']);

      console.log("CheckList");
      console.log(checkList['course'] +' => '+ checkList['promotion']); 
      (elt['course'] == checkList['course'] && elt['promotion'] == checkList['promotion'])
    }); */

    if(occupation.some(item => item.course === checkList.course && item.promotion == checkList.promotion)){
      return true;
    } 
    return false;

  }


  formatDate(dateToFormat: string) {
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    return formatDate(dateToFormat, format, locale);
  }

  isValidDeadline(date: Date) {
    return date.setHours(0,0,0,0) < new Date().setHours(0,0,0,0)
  };

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
