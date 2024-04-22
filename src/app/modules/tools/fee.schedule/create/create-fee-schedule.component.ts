import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeeSchedule } from '../model/fee.schedule';
import { FeeScheduleLine } from '../model/fee.schedule.line';
import { FeeScheduleService } from '../service/fee-schedule.service';

@Component({
  selector: 'create-fee-schedule',
  templateUrl: './create-fee-schedule.component.html',
  styleUrls: ['./create-fee-schedule.component.scss']
})
export class CreateFeeScheduleComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  feeScheduleLines: FeeScheduleLine[] = [];
  @Input() editfeeSchedules: FeeSchedule;
  feeSchedules: FeeSchedule = {
    provider: 'default',
    planType: 'default'
  };
  addNewFeeScheduleLine: FeeScheduleLine = {
    rateType: 'Per_Unit'
  };
  constructor(private feeScheduleService: FeeScheduleService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fillModel();
  }
  fillModel() {
    if (this.editfeeSchedules !==undefined){
      this.feeSchedules = this.editfeeSchedules;
      this.feeScheduleLines = this.editfeeSchedules.feeLines;
    }
  }
  addLine() {
    this.feeScheduleLines.push(this.addNewFeeScheduleLine)
    this.addNewFeeScheduleLine = {
      rateType: 'Per_Unit'
    };
  }
  create() {
    this.feeSchedules.feeLines = this.feeScheduleLines;
    this.feeSchedules.defaultFee = false;
    this.feeScheduleService.create(this.feeSchedules).subscribe(result => {
      this.scrollUp();
      this.toastr.success('Fee Schdule Created.')
      this.changeVisibility.emit('close')
    }, error => {
      this.toastr.error('Erro during creating Fee Schdule')
      console.log('error ' + error)
    })
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}
