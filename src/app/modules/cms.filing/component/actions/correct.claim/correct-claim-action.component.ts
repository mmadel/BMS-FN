import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoiceEmitterService } from 'src/app/modules/invoice/service/emitting/invoice-emitter.service';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientSession } from 'src/app/modules/model/clinical/session/patient.session';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { SessionHistoryCount } from '../../../model/session.history.count';

@Component({
  selector: 'correct-claim-action',
  templateUrl: './correct-claim-action.component.html',
  styleUrls: ['./correct-claim-action.component.scss']
})
export class CorrectClaimActionComponent implements OnInit {
  @Input() sessionCounts?: SessionHistoryCount[]
  @Input() patient: Patient;
  @Output() changeVisibility = new EventEmitter<string>()
  counter: number;
  progressValue: number;
  selectedSessionId: number
  selectePatientSession: PatientSession
  constructor(private patientSessionService: PatientSessionService
    , private router: Router
    , private invoiceEmitterService: InvoiceEmitterService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.counter = 1;
    this.progressValue = 0;
    if (this.sessionCounts.length === 1) {
      this.selectedSessionId = this.sessionCounts[0].sessionId;
      this.findSession();
    }
  }
  next(patientModel: string) {
    this.proceedToNextStep();
  }
  back(patientModel?: string) {
    this.counter--;
    this.calculatePercentage(this.counter, 'back');
  }
  proceedToNextStep() {
    this.calculatePercentage(this.counter, 'next');
    this.counter++;
    this.findSession();
  }
  calculatePercentage(index: number, action: string) {
    if (action === 'back')
      index--;
    this.progressValue = Math.round(((index / 2) / 100) * 10000);
  }
  selectSession(event: any) {
    this.selectedSessionId = event.target.value;
  }
  correct(action: string) {
    this.changeVisibility.emit('');
    this.patientSessionService.correctClaim(this.selectePatientSession).subscribe(result => {
      switch (action) {
        case 'redirect':          
          var invoiceLinesRender: any = { filter: true, startDate: this.selectePatientSession.serviceDate, endDate: this.selectePatientSession.serviceDate, client: this.patient }
          this.invoiceEmitterService.invoiceLinesRendering$.next(invoiceLinesRender)
          this.router.navigate(['/invoice/session/list/'], { state: { filter: true, startDate: this.selectePatientSession.serviceDate, endDate: this.selectePatientSession.serviceDate, client: this.patient } });
          break;
        case 'close':
          this.toastr.success('Claim has been marked as corrected');
          this.scrollUp()
          break;
      }
    }, (error) => {
      this.toastr.error('Error during correcting pateint session');
    })
  }
  private findSession() {
    this.patientSessionService.findSessionById(this.selectedSessionId).subscribe(result => {
      this.selectePatientSession = result.records
    })
  }
  private scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}
