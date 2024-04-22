import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  feeLinesVisible: boolean = false;
  addFeeScheduleVisible: boolean = false;
  selectedFeeSceduleId: number;
  constructor(private feeScheduleService: FeeScheduleService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.find();
  }
  togglefeeLinesVisible() {
    this.feeLinesVisible = !this.feeLinesVisible
  }
  toggleFeeScheduleVisible() {
    this.addFeeScheduleVisible = !this.addFeeScheduleVisible
  }
  createFeeSchdule(){
    this.addFeeScheduleVisible = true;
  }
  private find() {
    this.feeScheduleService.find().subscribe((result: any) => {
      this.feeSchedules = result
    })
  }
  showStatus(defaultFee: boolean) {

  }
  edit() {

  }
  delete(id: number) {
    this.feeScheduleService.deleteById(id).subscribe(result => {
      this.find();
      this.toastr.success("Fee Schedule deleted.")
    })
  }
  showLines(id: number) {
    this.selectedFeeSceduleId = id
    this.feeLinesVisible = true;
  }
}
