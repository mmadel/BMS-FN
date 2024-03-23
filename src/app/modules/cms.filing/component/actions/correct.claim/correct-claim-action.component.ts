import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'correct-claim-action',
  templateUrl: './correct-claim-action.component.html',
  styleUrls: ['./correct-claim-action.component.scss']
})
export class CorrectClaimActionComponent implements OnInit {
  cards: { id: number, name: string }[] = [
    { "id": 1, "name": "Session Selection" },
    { "id": 2, "name": "Confirmation" },
  ];
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
    this.progressValue = Math.round(((index / this.cards.length) / 100) * 10000);
  }
  
}
