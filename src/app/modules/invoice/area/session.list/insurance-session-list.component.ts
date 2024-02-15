import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { filter, map, Observable, tap } from 'rxjs';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { SelectedSessionServiceLine } from 'src/app/modules/model/invoice/select.session.service.line';
import { PateintEmittingService } from 'src/app/modules/patient/service/emitting/pateint-emitting.service';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { ClientSessionResponse } from '../../model/client.session.response';
import { SessionServiceCodeLine } from '../../model/session.service.code.line';
import { InvoiceEmitterService } from '../../service/emitting/invoice-emitter.service';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-insurance-session-list',
  templateUrl: './insurance-session-list.component.html',
  styleUrls: ['./insurance-session-list.component.scss']
})
export class InsuranceSessionListComponent implements OnInit, AfterViewInit {
  editFields: boolean = false;
  invoiceCreationVisible: boolean = false;
  clientSessionResponse!: ClientSessionResponse;
  sessionServiceCodeLine: Observable<SessionServiceCodeLine[]>
  client: Patient
  editSessionVisibility: boolean = false;
  editSessionItemVisibility: boolean = false;
  selectedSessionToEditItem: SessionServiceCodeLine
  sessionItemType: string;
  selectedSessionServiceCodeLine: SelectedSessionServiceLine[]
  editPatientProfileVisibility: boolean = false
  constructor(
    private invoiceEmitterService: InvoiceEmitterService
    , private emitPatientSessionService: EmitPatientSessionService
    ,private patientSessionService:PatientSessionService
    ,private invoiceService:InvoiceService) { }
  ngAfterViewInit(): void {

  }
  columns = [
    'dos',
    'provider',
    'case',
    {
      key: 'place',
      _style: { width: '5%' },
    },
    {
      key: 'cpt',
      _style: { width: '8%' },
    },
    {
      key: 'unit',
      _style: { width: '5%' },
    },
    {
      key: 'charge',
      _style: { width: '8%' },
    },
    {
      key: 'actions',
      label: '',
      filter: false,
      sorter: false
    }
  ];
  toggleDetails() {
    this.editFields = !this.editFields;
  }

  clickOnCreateInvoice() {
    this.invoiceCreationVisible = true;
  }
  ngOnInit(): void {
    this.sessionServiceCodeLine = this.invoiceEmitterService.selectedInvoiceClientSession$.pipe(
      filter((result) => result !== null),
      tap((result) => {
        this.client = result.client
      }),
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
              case: session.caseTitle,
              place: session.placeOfCode.split('_')[1],
              cpt: serviceCode.cptCode.serviceCode,
              unit: serviceCode.cptCode.unit,
              charge: serviceCode.cptCode.charge,
              cptId: serviceCode.id,
              data: session,
              serviceCode: serviceCode
            }
            lines.push(line);
          }
        }
        return lines;
      })
    )
  }
  editClient() {
    // this.pateintEmittingService.selectedPatient$.next(this.client)
    // this.router.navigate(['/patient/profile', this.client.id]);
    this.editPatientProfileVisibility = true;

  }
  editSession(event: any) {
    this.patientSessionService.findSessionById(event.data.id)
    .subscribe((result)=>{
      this.editSessionVisibility = true;
      this.emitPatientSessionService.patientSession$.next(result.records);
    })
  }
  editSessionItem(item: any, itemType: string) {
    this.sessionItemType = itemType;
    this.selectedSessionToEditItem = item;
    this.editSessionItemVisibility = true;
  }
  createInvoice() {
    this.invoiceCreationVisible = true;
  }
  toggleEditSession() {
    this.editSessionVisibility = !this.editSessionVisibility;
  }
  toggleEditSessionItem() {
    this.editSessionItemVisibility = !this.editSessionItemVisibility;
  }
  toggleCreateInvoice() {
    this.invoiceCreationVisible = !this.invoiceCreationVisible
  }

  changeSessionEditVisibility(event: any) {
    if (event === 'close'){
      this.invoiceService.findByClient(this.client.id)
      .subscribe((returnedClient:any)=>{
        this.editSessionVisibility = false;
        var clientSessionResponse: ClientSessionResponse = {
          sessions: returnedClient.sessions,
          client: returnedClient
        }
        this.invoiceEmitterService.selectedInvoiceClientSession$.next(clientSessionResponse)
      }) 
    }
  }
  changeSessionItemVisibility(event: any) {
    if (event === 'close')
      this.editSessionItemVisibility = false;
  }
  onSelectedServiceCode(event: any) {
    this.selectedSessionServiceCodeLine = event.map((value: any) => {
      return {
        sessionId: value.data,
        serviceLine: value.serviceCode
      }
    });
  }
  changeCreateInvoiceVisibility(event: any) {
    if (event === 'close')
      this.invoiceCreationVisible = false;
  }
  toggleViewPatientProfile() {
    this.editPatientProfileVisibility = !this.editPatientProfileVisibility
  }
  changeEditPorfileVisibility(event: any) {
    if (event === 'close')
      this.editPatientProfileVisibility = false;
  }
}
