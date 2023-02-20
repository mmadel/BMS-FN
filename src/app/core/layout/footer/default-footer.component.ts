import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '@coreui/angular-pro';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.css']
})
export class DefaultFooterComponent extends FooterComponent {

  constructor() {
    super();
  }

}
