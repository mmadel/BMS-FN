import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { FeeScheduleLine } from '../model/fee.schedule.line';
import { FeeScheduleService } from '../service/fee-schedule.service';

@Component({
  selector: 'app-find-lines',
  templateUrl: './find-lines.component.html',
  styleUrls: ['./find-lines.component.scss']
})
export class FindLinesComponent extends ListTemplate implements OnInit {

  constructor(private feeScheduleService: FeeScheduleService) { super() }
  patients$!: Observable<FeeScheduleLine[]>;
  columns = [
    {
      key: 'cptCode',
      _style: { width: '10%' }
    },
    {
      key: 'rateType',
      _style: { width: '10%' }
    },
    {
      key: 'perUnit',
      _style: { width: '10%' }
    },
    {
      key: 'chargeAmount',
      _style: { width: '10%' }
    }
  ];
  ngOnInit(): void {
    this.initListComponent();
  }

}
