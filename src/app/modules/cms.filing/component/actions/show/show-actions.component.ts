import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SessionHistoryAction } from '../../../model/session.history.actions';

@Component({
  selector: 'show-actions',
  templateUrl: './show-actions.component.html',
  styleUrls: ['./show-actions.component.scss']
})
export class ShowActionsComponent implements OnInit {
  @Input() submissionType: string
  @Output() changeVisibility = new EventEmitter<string>()
  actionItems: SessionHistoryAction[];
  
  constructor() { }

  ngOnInit(): void {
    switch (this.submissionType) {
      case 'Print':
        this.actionItems = [];
        this.actionItems.push({
          title: 'Create Correct claim',
          action: 'correct_claim'
        });
        this.actionItems.push({
          title: 'Submit electronically',
          action: 'submit_electronically'
        });
        break;
      case 'Electronic':
        this.actionItems = [];

        this.actionItems.push({
          title: 'View status message',
          action: 'View status message'
        });
        this.actionItems.push({
          title: 'View EDI File',
          action: 'View status message'
        });
        this.actionItems.push({
          title: 'Resend',
          action: 'Resend'
        });
        this.actionItems.push({
          title: 'Correct Claim',
          action: 'Correct Claim'
        });
        break;
    }
  }
  executeAction(action: string) {
    this.changeVisibility.emit(action);
  }
}
