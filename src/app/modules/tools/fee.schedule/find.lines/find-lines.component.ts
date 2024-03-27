import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { FeeScheduleLine } from '../model/fee.schedule.line';
import { FeeScheduleService } from '../service/fee-schedule.service';

@Component({
  selector: 'find-lines',
  templateUrl: './find-lines.component.html',
  styleUrls: ['./find-lines.component.scss']
})
export class FindLinesComponent extends ListTemplate implements OnInit {

  constructor(private feeScheduleService: FeeScheduleService) { super() }
  feeScheduleLines$!: Observable<FeeScheduleLine[]>;
  @Input() feeScheduleId: number;
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
    this.find();
  }
  private find() {
    this.feeScheduleLines$ = this.feeScheduleService.findAll(this.apiParams$, this.feeScheduleId)
      .pipe(
        tap((response: any) => {
          this.totalItems$.next(response.number_of_matching_records);
          if (response.number_of_records) {
            this.errorMessage$.next('');
          }
        }),
        map((response: any) => {
          return response.records;
        })
      )
  }

}
