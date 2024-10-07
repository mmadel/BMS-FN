import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubmissionClaimMessages } from '../../../model/submission.claim.messages';
import { SessionHistoryService } from '../../../service/session-history.service';

@Component({
  selector: 'show-claim-messages',
  templateUrl: './show-claim-messages.component.html',
  styleUrls: ['./show-claim-messages.component.scss']
})
export class ShowClaimMessagesComponent implements OnInit {
  @Input() submissionID: number;
  @Output() changeVisibility = new EventEmitter<string>()
  submissionClaimMessages: SubmissionClaimMessages[]
  constructor(private sessionHistoryService: SessionHistoryService) { }

  ngOnInit(): void {
    this.catchMessages()
  }

  private catchMessages() {
    this.sessionHistoryService.findMessages(this.submissionID).subscribe((result: any) => {
      this.submissionClaimMessages = result
    }, error => {
    })
  }
  close() {
    this.changeVisibility.emit('messages');
  }
}
