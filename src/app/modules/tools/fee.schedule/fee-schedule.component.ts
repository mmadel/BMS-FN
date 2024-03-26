import { Component, OnInit } from '@angular/core';
import { FeeSchedule } from './model/fee.schedule';
import { FeeScheduleService } from './service/fee-schedule.service';
import usersData from './_data'
@Component({
  selector: 'app-fee-schedule',
  templateUrl: './fee-schedule.component.html',
  styleUrls: ['./fee-schedule.component.scss']
})
export class FeeScheduleComponent implements OnInit {
  feeSchedules: FeeSchedule[]
  constructor(private feeScheduleService: FeeScheduleService) { }

  ngOnInit(): void {
    this.find();
  }

  private find() {
    this.feeScheduleService.find().subscribe((result: any) => {
      this.feeSchedules = result
    })
  }
  showStatus(defaultFee:boolean){

  }
  edit(){

  }
  delete(){

  }
  showLines(){
    
  }
}
