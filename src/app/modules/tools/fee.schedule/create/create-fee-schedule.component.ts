import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FeeSchedule } from '../model/fee.schedule';
import { FeeScheduleLine } from '../model/fee.schedule.line';

@Component({
  selector: 'create-fee-schedule',
  templateUrl: './create-fee-schedule.component.html',
  styleUrls: ['./create-fee-schedule.component.scss']
})
export class CreateFeeScheduleComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  feeScheduleLines: FeeScheduleLine[] = [];
  feeSchedules: FeeSchedule ={
    provider:'default',
    planType:'default'
  };
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
  create(){
    this.feeSchedules.feeLines= this.feeScheduleLines; 
    this.feeSchedules.defaultFee = false;
    this.changeVisibility.emit('close')
    console.log(JSON.stringify(this.feeSchedules))
  }
}
