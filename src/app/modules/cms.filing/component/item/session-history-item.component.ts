import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { InvoiceService } from 'src/app/modules/invoice/service/invoice.service';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { SessionHistory } from '../../model/session.history';

@Component({
  selector: 'session-history-item',
  templateUrl: './session-history-item.component.html',
  styleUrls: ['./session-history-item.component.scss']
})
export class SessionHistoryItemComponent implements OnInit {
  @Input() item: SessionHistory;
  showMessagesVisibility: boolean = false
  editSessionVisibility: boolean = false;
  showCorrectClaimActionVisibility: boolean = false;
  componentRole: string[] = [Role.FILING_ROLE];
  constructor(private invoiceService: InvoiceService
    , private emitPatientSessionService: EmitPatientSessionService
    , private patientSessionService: PatientSessionService) { }

  ngOnInit(): void {
  }
  openMessages() {
    this.showMessagesVisibility = true;
  }
  correctClaim() {
    this.showCorrectClaimActionVisibility = true
  }
  toggle(name: string) {
    if (name === 'messages')
      this.showMessagesVisibility = !this.showMessagesVisibility;
    if (name === 'correct')
      this.showCorrectClaimActionVisibility = !this.showCorrectClaimActionVisibility;
    if (name === 'session')
      this.editSessionVisibility = !this.editSessionVisibility
  }
  openSession(session: any) {
    this.patientSessionService.findSessionById(session.sessionId)
      .subscribe((result) => {
        this.emitPatientSessionService.patientSession$.next(result.records);
        this.editSessionVisibility = true;
      })
  }
  changeVisibility(event: any) {
    if (event === 'messages')
      this.showMessagesVisibility = !this.showMessagesVisibility;
    if (event === 'correct_claim')
      this.showCorrectClaimActionVisibility = !this.showCorrectClaimActionVisibility;
    if (event === 'session')
      this.editSessionVisibility = !this.editSessionVisibility;
  }
  downloadCMS() {
    this.invoiceService.downloadCMS(this.item.submissionId).subscribe(result => {
      this.constructExportedFile(result, 'cms-', 'pdf')
    }, error => {

    })
  }
  constructExportedFile(response: any, fileName: string, extention: string) {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(response)
    a.href = objectUrl
    var nameDatePart = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    a.download = fileName + nameDatePart + '.' + extention;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }
  getColor(status: string): string {
    switch (status) {
      case 'Success':
        return '#ebedef';
      case 'Pending':
        return '321fdb';
      case 'acknowledge':
        return '#2eb85c';
      case 'error':
        return '#e55353';
    }
    return '';
  }
}

