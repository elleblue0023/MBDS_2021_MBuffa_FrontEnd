import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class DesignUtilService {

  constructor() { }


  /**------------------------------------------------------------------------------------------------
   * snackBarData = {
   *    status: [success, info, warning, ...] (OBLIGATOIRE),
   *    message: message to display,
   *    action: message to display to close the snackbar
   * }
   *------------------------------------------------------------------------------------------------**/
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

  openSnackBarFillForms(_snackBar: MatSnackBar) {
    _snackBar.open(
      "Veuillez remplir les champs obligatoires !",
      "OK", {
      panelClass: ['warning-snackbar'],
      duration: 3500,
    }
    );
  }


  /**------------------------------------------------------------------------
   * inputDialogData = {
   *  _dialog : OBLIGATOIRE (MatDialog Reference)
   *  action: edit, add, delete (confirm delete), detail,
   *  component: current component (example: publication-professor),
   *  data : {
   *    data to edit, add, delete, show (detail) 
   *  }
   * }  
   *------------------------------------------------------------------------**/
  
}
