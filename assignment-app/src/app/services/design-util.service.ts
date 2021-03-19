import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilService {

  constructor() { }

  openSnackBar(snackBarData: any) {
    switch (snackBarData.status) {
      case 'success':
        snackBarData.snackBar.open(
          snackBarData.message, 
          snackBarData.action, {
            panelClass: ['success-snackbar'],
            duration: 2500,
          }
        );
        break;
      case 'info':
        snackBarData.snackBar.open(
          snackBarData.message, 
          snackBarData.action, {
            panelClass: ['info-snackbar'],
            duration: 3000,
          }
        );
        break;
      default:
        snackBarData.snackBar.open(
          snackBarData.message, 
          snackBarData.action, {
            panelClass: ['warning-snackbar'],
            duration: 3500,
          }
        );
        break;
    }
    
  }
}
