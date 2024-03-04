import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { ClientSessionResponse } from 'src/app/modules/invoice/model/client.session.response';
import { InvoiceEmitterService } from 'src/app/modules/invoice/service/emitting/invoice-emitter.service';
import { InvoiceService } from 'src/app/modules/invoice/service/invoice.service';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { PatientSessionResponse } from 'src/app/modules/model/clinical/session/patient.session.response';
import { ServiceCode } from 'src/app/modules/model/clinical/session/service.code';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { PatientSessionEditComponent } from '../edit/patient-session-edit.component';

@Component({
  selector: 'app-pateint-session-list',
  templateUrl: './pateint-session-list.component.html',
  styleUrls: ['./pateint-session-list.component.scss']
})
export class PateintSessionListComponent extends ListTemplate implements OnInit {
  @Input() pateint: Patient;
  editSessionVisibility: boolean = false;
  correctRedirectConfiramtionVisibility: boolean = false;
  correctClaimRedirect: boolean = false;
  @ViewChild(PatientSessionEditComponent, { static: false }) patientSessionEditComponent: PatientSessionEditComponent;
  columns = [
    {
      key: 'dateOfService',
    },
    {
      key: 'doctorName',
    },
    {
      key: 'correct',
      label: 'Correct',
    },
    {
      key: 'actions',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false
    }
  ];
  details_visible = Object.create({});
  patientSessions$!: Observable<PatientSessionResponse[]>;
  selectedPatientSession: any;
  constructor(private patientSessionService: PatientSessionService
    , private emitPatientSessionService: EmitPatientSessionService
    , private router: Router
    , private toastr: ToastrService
    , private invoiceEmitterService: InvoiceEmitterService) { super(); }

  ngOnInit(): void {
    this.initListComponent();
    this.find();
  }
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
  find() {
    this.patientSessions$ = this.patientSessionService.findSessions(this.apiParams$, this.pateint.id).pipe(
      map((response: any) => {
        var list: PatientSessionResponse[] = new Array();
        for (let i = 0; i < response.records.length; i++) {
          var patientSession: PatientSession = response.records[i];
          var patientSessionResponse: PatientSessionResponse = {
            id: patientSession.id,
            dateOfService: moment.unix(patientSession.serviceDate / 1000).toDate(),
            doctorName: '(' + patientSession.doctorInfo.doctorLastName + ', ' + patientSession.doctorInfo.doctorFirstName + ')',
            data: patientSession
          }
          list.push(patientSessionResponse);
        }
        return list;
      })
    );
  }
  toggleEditSession(item: any) {
    this.editSessionVisibility = !this.editSessionVisibility;
  }
  toggleCorrectRedirectConfiramtion() {
    this.correctRedirectConfiramtionVisibility = !this.correctRedirectConfiramtionVisibility;
  }
  openEditPateintSession(selectedPatientSession: any) {
    this.editSessionVisibility = true;
    this.emitPatientSessionService.patientSession$.next(selectedPatientSession.data);

  }
  correctClaim(selectedPatientSession: any) {
    this.selectedPatientSession = selectedPatientSession;
    this.correctRedirectConfiramtionVisibility = true;
  }
  redirectConfirmation(value: boolean) {
    this.correctClaimRedirect = value;
    this.correctRedirectConfiramtionVisibility = !this.correctRedirectConfiramtionVisibility;
    this.execute();
  }
  changeVisibility(event: any) {
    if (event === 'session') {
      this.editSessionVisibility = false;
      this.find();
    }
  }
  execute() {
    this.patientSessionService.correctClaim(this.selectedPatientSession.data)
      .subscribe(result => {
        if (this.correctClaimRedirect) {
          var returned: PatientSession = result;
          var filterServiceCodes: ServiceCode[] = returned.serviceCodes.filter(serviceLine => serviceLine.type !== 'Invoice')
          filterServiceCodes.forEach(serviceLine => {
            serviceLine.isCorrect = true;
          })

          this.selectedPatientSession.data.serviceCodes = filterServiceCodes;
          var sessions: PatientSession[] = [this.selectedPatientSession.data];
          var clientSessionResponse: ClientSessionResponse = {
            sessions: sessions,
            client: this.pateint,
            isFiltered:true
          }
          this.invoiceEmitterService.invoicedSession$.next(clientSessionResponse)
          this.router.navigate(['/invoice/session/list/']);
        } else {
          this.toastr.success('Claim has been marked as corrected');
          this.scrollUp()
        }
        this.correctRedirectConfiramtionVisibility = false;
      }, (error) => {
        this.toastr.error('Error during correcting pateint session');
      })
    this.correctRedirectConfiramtionVisibility = true;
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}
