import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'show-actions',
  templateUrl: './show-actions.component.html',
  styleUrls: ['./show-actions.component.scss']
})
export class ShowActionsComponent implements OnInit {
  @Input() submissionType: string
  actionItems: string[];
  constructor() { }

  ngOnInit(): void {
    switch (this.submissionType) {
      case 'Print':
        this.actionItems = [];
        this.actionItems.push('Create Correct claim');
        this.actionItems.push('Submit electronically');
        break;
      case 'Electronic':
        this.actionItems = [];
        this.actionItems.push('View status message');
        this.actionItems.push('View EDI File');
        this.actionItems.push('Resend');
        this.actionItems.push('Correct Claim');
        break;
    }
  }

}
