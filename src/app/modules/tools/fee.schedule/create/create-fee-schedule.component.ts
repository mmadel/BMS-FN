import { Component, OnInit } from '@angular/core';
import { FeeScheduleLine } from '../model/fee.schedule.line';

@Component({
  selector: 'create-fee-schedule',
  templateUrl: './create-fee-schedule.component.html',
  styleUrls: ['./create-fee-schedule.component.scss']
})
export class CreateFeeScheduleComponent implements OnInit {
  feeScheduleLines: FeeScheduleLine[] = [];
  addNewFeeScheduleLine: FeeScheduleLine = {
    rateType: 'Per_Unit'
  };
  constructor() { }

  ngOnInit(): void {
  }
  addLine() {
    this.feeScheduleLines.push(this.addNewFeeScheduleLine)
    this.addNewFeeScheduleLine = {
      rateType: 'Per_Unit'
    };
  }
}
