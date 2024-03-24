import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SessionHistoryCount } from '../../../model/session.history.count';

@Component({
  selector: 'correct-claim-action',
  templateUrl: './correct-claim-action.component.html',
  styleUrls: ['./correct-claim-action.component.scss']
})
export class CorrectClaimActionComponent implements OnInit {
  @Input() sessionCounts?: SessionHistoryCount[]
  @Output() changeVisibility = new EventEmitter<string>()
  counter: number;
  progressValue: number;
  constructor() { }

  ngOnInit(): void {
    this.counter = 1;
    this.progressValue = 0;
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
  }
  calculatePercentage(index: number, action: string) {
    if (action === 'back')
      index--;
    this.progressValue = Math.round(((index / 2) / 100) * 10000);
  }
  selectSession(event: any) {
    console.log(event.target.value)
  }
  correct(action: string) {
    this.changeVisibility.emit('close');
    switch (action) {
      case 'redirect':
        console.log('redirect')
        break;
      case 'close':
        console.log('close')
        break;
    }
  }
}
