import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SessionHistory } from '../../model/session.history';

@Component({
  selector: 'session-history-item',
  templateUrl: './session-history-item.component.html',
  styleUrls: ['./session-history-item.component.scss']
})
export class SessionHistoryItemComponent implements OnInit {
  @Input() item: SessionHistory;
  showActionVisibility: boolean = false
  showCorrectClaimActionVisibility: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleActionsModal() {
    this.showActionVisibility = !this.showActionVisibility
  }
  openSession(sessionId: number) {
    console.log(sessionId)
  }
  changeVisibility(event: any) {
    this.showActionVisibility = false
    if (event === 'correct_claim')
      this.showCorrectClaimActionVisibility = true;
  }
}
