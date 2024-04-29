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
  @Input() defaultFeeSchedule: boolean
  mode: string = 'create';
  lineMode: string = 'create';
  valid: boolean = true;
  feeSchedules: FeeSchedule = {
    provider: null,
    insurance: null
  };
  addNewFeeScheduleLine: FeeScheduleLine = {
    rateType: 'Per_Unit'
  };
  inheritDefault?: boolean = false;
  defaultFee: FeeScheduleLine[]
  compareFn = this._compareFn.bind(this);
  constructor(private feeScheduleService: FeeScheduleService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.findMetaData();
    if (this.editfeeSchedules === undefined) {
      this.mode = 'create'
    }

    else {
      this.defaultFeeSchedule = !this.editfeeSchedules.defaultFee;
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
      this.addNewFeeScheduleLine.perUnit = 1;
    } else {
      this.addNewFeeScheduleLine.perUnit = 1;
      this.feeScheduleLines.push(this.addNewFeeScheduleLine)
    }
  }

  create() {
    this.validate();
    if (this.valid) {
      this.feeSchedules.feeLines = this.feeScheduleLines;
      if (this.mode === 'create')
      this.feeSchedules.defaultFee = !this.defaultFeeSchedule;
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
    if (this.defaultFeeSchedule)
      if (this.feeSchedules.provider !== null && this.feeSchedules.insurance !== null)
        this.valid = true
      else
        this.valid = false;
  }
  findMetaData() {
    this.feeScheduleService.findMetaData().subscribe((result: any) => {
      this.feeScheduleMetaData = result;
    })
  }
  changeInheritDefault() {

    if (this.inheritDefault) {
      this.feeScheduleService.findDefault().subscribe((result: any) => {
        this.defaultFee = result.feeLines;
        this.feeScheduleLines.push(...this.defaultFee)
      })
    } else {
      const subSet = new Set(this.defaultFee);
      this.feeScheduleLines = this.feeScheduleLines.filter(obj => !subSet.has(obj));
    }
  }
  _compareFn(a: any, b: any) {
    return a?.id === b?.id;
  }
}
