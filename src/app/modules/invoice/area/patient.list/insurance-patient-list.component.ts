import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { PatientService } from 'src/app/modules/patient/service/patient.service';
import { ClientResponse } from '../../model/client.response';
import { ClientSessionResponse } from '../../model/client.session.response';
import { InvoiceEmitterService } from '../../service/emitting/invoice-emitter.service';
import { InvoiceService } from '../../service/invoice.service';
@Component({
  selector: 'app-insurance-patient-list',
  templateUrl: './insurance-patient-list.component.html',
  styleUrls: ['./insurance-patient-list.component.scss']
})
export class InsurancePatientListComponent extends ListTemplate implements OnInit {
  patients$!: Observable<ClientResponse[]>;


  columns = [
    {
      key: 'clientName',
      _style: { width: '40%' }
    },
    { key: 'primaryInsurance', _style: { width: '25%' } },
    { key: 'secondaryInsurance', _style: { width: '25%' } },
    { key: 'actions', _style: { width: '25%' }, label: '' },
  ];
  constructor(private invoiceService: InvoiceService
    , private invoiceEmitterService: InvoiceEmitterService
    , private patienService: PatientService) { super() }

  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }
  find() {
    this.patients$ = this.invoiceService.findAll(this.apiParams$).pipe(
      filter((result) => result != null),
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        var list: ClientResponse[] = new Array()
        for (var i = 0; i < response.records.length; i++) {
          var obj: any = response.records[i];
          var clientResponse: ClientResponse = {
            clientName: obj.patientName,
            clientId: obj.patientId,
            sessions: obj.patientSession,
          }
          list.push(clientResponse)
        }
        return list;
      })
    );
  }
  sendSession(item: any) {
    this.invoiceEmitterService.clientId$.next(item.clientId);
    this.patienService.findById(item.clientId).subscribe(reuslt => {
      var clientSessionResponse: ClientSessionResponse = {
        sessions: item.sessions,
        client: reuslt
      }
      this.invoiceEmitterService.invoicedSession$.next(clientSessionResponse)
    })
  }
}
