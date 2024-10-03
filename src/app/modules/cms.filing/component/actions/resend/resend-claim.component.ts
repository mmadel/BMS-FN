import { Component, Input, OnInit } from '@angular/core';
import { SessionHistoryService } from '../../../service/session-history.service';

@Component({
  selector: 'resend-claim',
  templateUrl: './resend-claim.component.html',
  styleUrls: ['./resend-claim.component.scss']
})
export class ResendClaimComponent implements OnInit {
  @Input() submissionId: number
  @Input() insuranceCompany: string;
  @Input() patientId: number
  constructor(private sessionHistoryService: SessionHistoryService) { }

  ngOnInit(): void {
    this.prepare();
  }

  private prepare() {
    this.sessionHistoryService.prepareClaimToSend(this.patientId, this.submissionId).subscribe(result => {
      console.log(JSON.stringify(result))
    }, error => {
      console.log(JSON.stringify(error))
    })
  }

}
