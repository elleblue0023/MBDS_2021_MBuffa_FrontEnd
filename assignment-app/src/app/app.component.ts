import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'assignment-app';

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
  }
}

