import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeeSchedule } from '../model/fee.schedule';
import { FeeScheduleLine } from '../model/fee.schedule.line';
import { FeeScheduleMetaData } from '../model/fee.schedule.meta.data';
import { FeeScheduleService } from '../service/fee-schedule.service';

@Component({
  selector: 'create-fee-schedule',
  templateUrl: './create-fee-schedule.component.html',
  styleUrls: ['./create-fee-schedule.component.scss']
})
export class CreateFeeScheduleComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  feeScheduleLines: FeeScheduleLine[] = [];
  editfeeScheduleLine: FeeScheduleLine;
  feeScheduleMetaData: FeeScheduleMetaData;
  @Input() editfeeSchedules: FeeSchedule;
  mode: string = 'create';
  lineMode: string = 'create';
  valid: boolean = true;
  feeSchedules: FeeSchedule = {
    provider: 'default',
    insurance: 'default'
  };
  addNewFeeScheduleLine: FeeScheduleLine = {
    rateType: 'Per_Unit'
  };
  constructor(private feeScheduleService: FeeScheduleService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.findMetaData();
    if (this.editfeeSchedules === undefined)
      this.mode = 'create'
    else {
      this.mode = 'update'
      this.fillModel();
    }
  }
  fillModel() {
    this.feeSchedules = this.editfeeSchedules;
    this.feeScheduleLines = this.editfeeSchedules.feeLines;
  }
  addLine() {
    if (this.lineMode === 'update') {
      let indexToUpdate = this.feeScheduleLines.findIndex(item => item.cptCode === this.addNewFeeScheduleLine.cptCode);
      this.feeScheduleLines[indexToUpdate] = this.addNewFeeScheduleLine;
      this.lineMode = 'create'
    } else {
      this.feeScheduleLines.push(this.addNewFeeScheduleLine)
    }
    this.addNewFeeScheduleLine = {
      rateType: 'Per_Unit'
    };
  }
  create() {
    this.validate();
    if (this.valid) {
      this.feeSchedules.feeLines = this.feeScheduleLines;
      this.feeSchedules.defaultFee = false;
      this.feeScheduleService.create(this.feeSchedules).subscribe(result => {
        this.scrollUp();

        if (this.mode === 'create') {
          this.changeVisibility.emit('close_create')
          this.toastr.success('Fee Schdule Created.')
        }
        if (this.mode === 'update') {
          this.changeVisibility.emit('close_update')
          this.toastr.success('Fee Schdule Updated.')
        }
      }, error => {
        this.toastr.error('Erro during creating Fee Schdule')
        console.log('error ' + error)
      })
    }
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
  deleteLine(id: number) {
    this.feeScheduleLines.splice(id, 1);
  }
  editLine(cptCode: string) {
    this.lineMode = 'update'
    this.addNewFeeScheduleLine = this.feeScheduleLines.find(line => line.cptCode === cptCode);
  }
  validate() {
    console.log(JSON.stringify(this.feeSchedules))
    if (this.feeSchedules.provider !== 'default' && this.feeSchedules.insurance !== 'default')
      this.valid = true
    else
      this.valid = false;
  }
  findMetaData() {
    this.feeScheduleService.findMetaData().subscribe((result: any) => {
      this.feeScheduleMetaData = result;
    })
  }
}
