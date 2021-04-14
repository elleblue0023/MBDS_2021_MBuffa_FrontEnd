import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorTracker } from 'src/app/models/error-tracker';

import { DesignUtilService } from 'src/app/services/design-util.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogPublicationProfessorComponent } from './dialog-publication-professor/dialog-publication-professor.component';
import { ViewEncapsulation } from '@angular/core';
import { IPublication } from 'src/interfaces/publication';
import { IAssignment } from 'src/interfaces/assignment';
import { AssignementService } from 'src/app/services/assignement.service';
import { ActivatedRoute } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';


@Component({
  selector: 'app-publication-professor',
  templateUrl: './publication-professor.component.html',
  styleUrls: ['./publication-professor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PublicationProfessorComponent implements OnInit {

  myOccupation: any;
  currentProfessor: any;
  myPublications: IPublication[] = [];
  //myPublications: any;
  addPublicationForm: FormGroup;

  page: number = 1;
  totalPages?: number;
  hasNextPage: boolean = false;
  hasPrevPage: boolean = false;
  nextPage?: number;
  prevPage?: number;
  pageSizeOptions: number[] = [5, 10, 25];
  limit: number = 3;

  ACTION = "edit";
  COMPONENT = "publication-professor";

  markedAssignment: IAssignment[] = [];
  unMarkedAssignment: IAssignment[] = [];

  @ViewChild("scroller")
  scroller!: CdkVirtualScrollViewport;

  constructor(
    private route: ActivatedRoute,
    private designUtilService: DesignUtilService,
    private professorService: ProfessorService,
    private assignmentService: AssignementService,
    private _snackBar: MatSnackBar,
    private utilsService: UtilsService,
    private ngZone: NgZone,
    private _dialog: MatDialog
  ) {
    /**Initialisation de la form Group */
    this.addPublicationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      promotionCours: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required)
    })
  }

  /*
  listPublications() {
    this.professorService.getProfessorPublication().subscribe(
      (publications) => {
        if (publications instanceof Array) {
          publications.forEach(elt => {
            elt.isOutofDate = this.utilsService.isValidDeadline(new Date(elt.deadline));
          });
          this.myPublications = publications;
          this.professorService.publicationCount.next(this.myPublications.length);
        }
      },
      (error: ErrorTracker) => {
        let snackBarData = {
          snackBar: this._snackBar,
          message: error.userMessage,
          action: "OK",
          status: "warning"
        }
        this.designUtilService.openSnackBar(snackBarData) 
      }
    )
  }*/

  listPublications() {
    this.professorService.getProfessorPublicationPagine(this.page, this.limit).subscribe(
      (data) => {
        this.limit = data.limit;
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        if (data.docs instanceof Array) {
          data.docs.forEach(elt => {
            elt.isOutofDate = this.utilsService.isValidDeadline(new Date(elt.deadline));
          });
          this.myPublications = data.docs;
          this.professorService.publicationCount.next(this.myPublications.length);
        }
      },
      (error: ErrorTracker) => {
        let snackBarData = {
          snackBar: this._snackBar,
          message: error.userMessage,
          action: "OK",
          status: "warning"
        }
        this.designUtilService.openSnackBar(snackBarData) 
      }
    )
  }

  ngOnInit(): void {
    this.professorService.getCurrentProfessor().subscribe(
      (current) => {   
        this.currentProfessor = current;
        this.myOccupation = this.currentProfessor.occupation;
        this.route.queryParams.subscribe(queryparams => {
          this.page = queryparams.page || 1;
          console.log(this.page);
          this.limit = queryparams.limit || 3;
          this.listPublications();
        })
      }
    )
  }

  ngAfterViewInit() {
    this.scroller
      .elementScrolled()
      .pipe(
        map((event) => {
          return this.scroller.measureScrollOffset("bottom");
        }),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 50),
        throttleTime(1000)
      )
      .subscribe((dist) => {
        this.ngZone.run(() => {
          if (this.hasNextPage) {
            console.log(this.page);
            this.page = this.nextPage || 1;
            console.log(this.page);
            this.listPublicationsScroll();
          }
        });
      });
  }

  listPublicationsScroll() {
    this.professorService.getProfessorPublicationPagine(this.page, this.limit).subscribe(
      (data) => {
        this.limit = data.limit;
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        if (data.docs instanceof Array) {
          data.docs.forEach(elt => {
            elt.isOutofDate = this.utilsService.isValidDeadline(new Date(elt.deadline));
          });
          this.myPublications = this.myPublications.concat(data.docs);
          this.professorService.publicationCount.next(this.myPublications.length);
        }
      },
      (error: ErrorTracker) => {
        let snackBarData = {
          snackBar: this._snackBar,
          message: error.userMessage,
          action: "OK",
          status: "warning"
        }
        this.designUtilService.openSnackBar(snackBarData) 
      }
    )
  }

  onAddPublication() {
    if (this.addPublicationForm.valid) {
      let params = {
        message : this.addPublicationForm.controls["message"].value,
        name : this.addPublicationForm.controls["name"].value,
        promotion : this.addPublicationForm.controls["promotionCours"].value.promotion,
        course : this.addPublicationForm.controls["promotionCours"].value.course,
        deadline : this.utilsService.formatDate(this.addPublicationForm.controls["deadline"].value)
      } 

      this.professorService.savePublication(params).subscribe(
        () => {
          let snackBarData = {
            snackBar: this._snackBar,
            message: "Publication d'un projet avec succès",
            action: "OK",
            status: "success"
          }
          this.designUtilService.openSnackBar(snackBarData);
          this.listPublications();
          this.addPublicationForm.reset();
        },
        (error: ErrorTracker) => {
          let snackBarData = {
            snackBar: this._snackBar,
            message: error.userMessage,
            action: "OK",
            status: "warning"
          }
          this.designUtilService.openSnackBar(snackBarData)
          this.addPublicationForm.reset();
        }
      )
    }
  }

  openDialog(inputDialogData: any) {
    const dialogRef = inputDialogData._dialog.open(DialogPublicationProfessorComponent, {
      width: '100%',
      padding: '5px',
      data: inputDialogData
    });

    dialogRef.afterClosed().subscribe(formEditDialogData => {
      this.professorService.updatePublication(formEditDialogData).subscribe(
        () => {
          let snackBarData = {
            snackBar: this._snackBar,
            message: "Modification avec succès de la publication",
            action: "OK",
            status: "success"
          }
          this.designUtilService.openSnackBar(snackBarData) 
          this.listPublications();
        }
      )
    });
  }

  openDialogEditPublication(id: any) {
    this.professorService.getCurrentPublication(id).subscribe(
      (currentDataPublication) => {        
        const dialogData = {
          _dialog: this._dialog,
          action: this.ACTION,
          component: this.COMPONENT,
          data: currentDataPublication
        }
        this.openDialog(dialogData);
      },
      (error: ErrorTracker) => {
        let snackBarData = {
          snackBar: this._snackBar,
          message: error.userMessage,
          action: "OK",
          status: "warning"
        }
        this.designUtilService.openSnackBar(snackBarData)
      }
    )

  }

  onUpdateIdPublicationDetail(id) {
    this.professorService.getAssignmentListPublication(id).subscribe(
      (list) => {
        if (list instanceof Array) {
          let markedList: IAssignment[] = [];
          let unMarkedList: IAssignment[] = [];

          list.forEach(elt => {
            if (elt.publication != null) {
              (elt.isMarked) ? markedList.push(elt) : unMarkedList.push(elt)
            }
          });

          this.markedAssignment = markedList;
          this.unMarkedAssignment = unMarkedList;
        } 
      }, 
      (error: ErrorTracker) => {
        let snackBarData = {
          snackBar: this._snackBar,
          message: error.userMessage,
          action: "OK",
          status: "warning"
        }
        this.designUtilService.openSnackBar(snackBarData)
      }
    )
  }
}
