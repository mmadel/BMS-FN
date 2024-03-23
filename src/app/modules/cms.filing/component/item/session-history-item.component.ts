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
    if (event === 'close')
      this.showActionVisibility = false
  }
}
