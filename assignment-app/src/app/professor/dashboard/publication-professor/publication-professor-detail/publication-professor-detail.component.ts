import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-publication-professor-detail',
  templateUrl: './publication-professor-detail.component.html',
  styleUrls: ['./publication-professor-detail.component.scss']
})
export class PublicationProfessorDetailComponent implements OnInit {

  @Input() publication: any;
  constructor() { }

  ngOnInit(): void {
  }

}
