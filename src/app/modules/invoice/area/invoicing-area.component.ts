import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoicing-area',
  templateUrl: './invoicing-area.component.html',
  styleUrls: ['./invoicing-area.component.scss']
})
export class InvoicingAreaComponent implements OnInit {

  patientListVisible: boolean = false;
  sessionListVisible:boolean=false;

  togglePatientListVisibale() {
    this.patientListVisible = true;
    this.sessionListVisible = false;
  }
  toggleSessionListVisibale() {
    this.patientListVisible = false;
    this.sessionListVisible = true;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
