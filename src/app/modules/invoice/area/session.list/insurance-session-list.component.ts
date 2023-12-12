import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { filter, first, map, Observable } from 'rxjs';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { ClientSessionResponse } from '../../model/client.session.response';
import { SessionServiceCodeLine } from '../../model/session.service.code.line';
import { InvoiceEmitterService } from '../../service/emitting/invoice-emitter.service';
import sessionData from './_sessiondata';

@Component({
  selector: 'app-insurance-session-list',
  templateUrl: './insurance-session-list.component.html',
  styleUrls: ['./insurance-session-list.component.scss']
})
export class InsuranceSessionListComponent implements OnInit, AfterViewInit {
  sessionsData = sessionData;
  editFields: boolean = false;
  invoiceCreationVisible: boolean = false;
  clientSessionResponse!: ClientSessionResponse;
  sessionServiceCodeLine: Observable<SessionServiceCodeLine[]>
  constructor(private route: ActivatedRoute,
    private invoiceEmitterService: InvoiceEmitterService) { }
  ngAfterViewInit(): void {
   
  }
  columns = [
    'dos',
    'provider',
    'case',
    'place',
    'cpt',
    'unit',
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
    this.sessionServiceCodeLine = this.invoiceEmitterService.selectedInvoiceClientSession$.pipe(
      filter((result) => result !== null),
      map(result => {
        var lines: SessionServiceCodeLine[] = new Array();
        for (var i = 0; i < result.sessions.length; i++) {
          var session: PatientSession = result.sessions[i]
          var line: SessionServiceCodeLine;
          for (var j = 0; j < session.serviceCodes.length; j++) {
            var serviceCode: ServiceCode = session.serviceCodes[j]
            line = {
              dos: moment.unix(session.serviceDate / 1000).format('MM/DD/YYYY'),
              provider: session.doctorInfo.doctorFirstName + ',' + session.doctorInfo.doctorLastName,
              case: session.caseDiagnosis.diagnosisCode,
              place: session.placeOfCode,
              cpt: serviceCode.cptCode.serviceCode,
              unit: serviceCode.cptCode.unit,
              charge: serviceCode.cptCode.charge,
            }
            lines.push(line);
          }
        }
        return lines;
      })
    )
  }

}
