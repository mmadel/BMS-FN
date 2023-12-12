import { Component, OnInit } from '@angular/core';
import { filter, first, map, Observable, tap } from 'rxjs';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientSessionResponse } from 'src/app/modules/model/clinical/session/patient.session.response';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
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
    , private invoiceEmitterService: InvoiceEmitterService) { super() }

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
          var obj: Patient = response.records[i];
          var clientResponse: ClientResponse = {
            clientName: obj.lastName + ',' + obj.firstName,
            clientId: obj.id,
            primaryInsurance: this.getPrimaryInsurance(obj),
            secondaryInsurance: this.getSecondaryInsurance(obj),
            sessions: obj.sessions
          }
          list.push(clientResponse)
        }
        return list;
      })
    );
  }
  private getPrimaryInsurance(pateint: Patient): string {
    var result: string = ''
    if (pateint.patientInsurances !== undefined || pateint.patientInsurances.length > 0) {
      for (var i = 0; i < pateint.patientInsurances.length; i++) {
        if (pateint.patientInsurances[i].patientInsurancePolicy.responsability === 'Primary')
          result = pateint.patientInsurances[i].patientInsurancePolicy.insuranceCompnayName;
      }
    } else
      result = ''
    return result;
  }

  private getSecondaryInsurance(pateint: Patient): string {
    var result: string;
    if (pateint.patientInsurances !== undefined || pateint.patientInsurances.length > 0) {
      for (var i = 0; i < pateint.patientInsurances.length; i++) {
        if (pateint.patientInsurances[i].patientInsurancePolicy.responsability === 'Secondary')
          result = pateint.patientInsurances[i].patientInsurancePolicy.insuranceCompnayName;
      }
    } else
      result = ''
    return result;
  }
  sendSession(item: any) {
    var clientSessionResponse: ClientSessionResponse = {
      pateintId: item.clientId,
      pateintName: item.clientName,
      sessions: item.sessions
    }
    this.invoiceEmitterService.selectedInvoiceClientSession$.next(clientSessionResponse)
  }
}
