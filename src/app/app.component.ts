import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Assignment Application';

  constructor(private matIconRegistry: MatIconRegistry, private domSatinizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'assignment',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/assigment.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'student',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/student.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'teacher',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/teacher.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'login',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/login.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'logout',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/logout.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'communicate',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/communicate.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'assignments',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/assignment.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/edit.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'scholarship',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/scholarship.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'done',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/done.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'send_document',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/send_document.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'note',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/note.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/github.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'alarm',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/alarm.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'marked',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/marked.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'waiting',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/waiting.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'paper',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/paper.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'sended',
      this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/svgIcon/sended.svg")
    );
  }
}

