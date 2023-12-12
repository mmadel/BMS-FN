import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, first } from 'rxjs';
import { ClientSessionResponse } from '../../model/client.session.response';
import { InvoiceEmitterService } from '../../service/emitting/invoice-emitter.service';
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
  clientSessionResponse!: ClientSessionResponse;
  constructor(private route: ActivatedRoute,
    private invoiceEmitterService: InvoiceEmitterService) { }
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
    this.invoiceEmitterService.selectedInvoiceClientSession$.pipe(
      filter((result) => result !== null),
      first()
    ).subscribe((result) => {
      this.clientSessionResponse = result;
      console.log(JSON.stringify(this.clientSessionResponse))
    })
  }

}
