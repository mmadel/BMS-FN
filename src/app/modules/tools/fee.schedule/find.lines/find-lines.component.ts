import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { FeeScheduleLine } from '../model/fee.schedule.line';
import { FeeScheduleService } from '../service/fee-schedule.service';

@Component({
  selector: 'find-lines',
  templateUrl: './find-lines.component.html',
  styleUrls: ['./find-lines.component.scss']
})
export class FindLinesComponent implements OnInit {


  feeScheduleLines!: FeeScheduleLine[];
  @Input() feeScheduleId: number;
  showAddFeeScheduleLine: boolean = false;
  addNewFeeScheduleLine: FeeScheduleLine = {
    rateType: 'Per_Unit'
  };
  ngOnInit(): void {
    this.find();
  }
  constructor(private feeScheduleService: FeeScheduleService) {

  }
  showAddLine() {
    this.showAddFeeScheduleLine = true;
  }
  addLine() {
    this.showAddFeeScheduleLine = false;
    this.feeScheduleLines.push(this.addNewFeeScheduleLine)
    this.addNewFeeScheduleLine = {
      rateType: 'Per_Unit'
    };
  }
  private find() {
    this.feeScheduleService.findAll(this.feeScheduleId).subscribe(result => {
      this.feeScheduleLines = result;
    })
  }
  delete(id: number) {
    this.feeScheduleLines.splice(id, 1);
  }
  edit() {

  }
}
