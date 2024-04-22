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
  disableSetDefault?:boolean = false
  selectedFeeSceduleId: number;
  selectedFeeScedule: FeeSchedule
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
    var hasDefaultValue: any;
    if (value.defaultFee) {
      hasDefaultValue = this.feeSchedules.find(e => e.defaultFee)
    } else {
      hasDefaultValue = undefined;
    }
    if (hasDefaultValue === undefined) {
      this.feeScheduleService.create(value).subscribe(result => {
        this.toastr.success("Fee Schdule set As default");
      }, error => {

      })
    } else {
      this.toastr.warning("Can't set multiple default")
    }
  }
}
