import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import sessionData from './_sessiondata';

@Component({
  selector: 'app-insurance-session-list',
  templateUrl: './insurance-session-list.component.html',
  styleUrls: ['./insurance-session-list.component.scss']
})
export class InsuranceSessionListComponent implements OnInit {
  sessionsData = sessionData;
  editFields: boolean = false;
  invoiceCreationVisible: boolean = false;
  patientId: number
  constructor(private route: ActivatedRoute) { }
  columns = [
    'DOS',
    'provider',
    'dxCase',
    'place',
    'CPT',
    'units',
    'charge',
    {
      key: 'edit',
      label: '',
      filter: false,
      sorter: false
    },
    {
      key: 'session',
      label: '',
      filter: false,
      sorter: false
    }
  ];
  toggleDetails() {
    this.editFields = !this.editFields;
  }
  handleInsuranceSesstingsChange(event: boolean) {
    this.invoiceCreationVisible = event;
  }
  clickOnCreateInvoice() {
    this.invoiceCreationVisible = true;
  }
  createInvoice() {
    this.invoiceCreationVisible = false;
  }
  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('patientId'))
    console.log(this.patientId);
  }

}
