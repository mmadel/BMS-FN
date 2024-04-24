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
  editFeeScheduleVisible: boolean = false;
  selectedFeeSceduleId: number;
  selectedFeeScedule: FeeSchedule
  hasDefaultFee: boolean = false
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
  toggleEditFeeScheduleVisible() {
    this.editFeeScheduleVisible = !this.editFeeScheduleVisible
  }
  createFeeSchdule() {
    this.addFeeScheduleVisible = true;
  }
  editFeeSchdule(feeId: number) {
    this.selectedFeeScedule = this.feeSchedules.find(fee => fee.id === feeId);
    this.editFeeScheduleVisible = true;

  }
  private find() {
    this.feeScheduleService.find().subscribe((result: any) => {
      this.feeSchedules = result
      for (var i = 0; i < this.feeSchedules.length; i++) {
        if (this.feeSchedules[i].defaultFee) {
          this.hasDefaultFee = true;
          break;
        }
      }
    })
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
  changeVisibility(event: any) {
    if (event === 'close_create')
      this.addFeeScheduleVisible = false;
    if (event === 'close_update')
      this.editFeeScheduleVisible = false;
    this.find();
  }
  checkValue(value: FeeSchedule) {
    this.feeScheduleService.create(value).subscribe(result => {
      this.toastr.success("Fee Schdule set Active");
    }, error => {

    })
  }
}
