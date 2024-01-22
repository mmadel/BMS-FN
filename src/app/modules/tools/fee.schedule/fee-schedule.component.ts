import { Component, OnInit } from '@angular/core';
import usersData from './_data'
@Component({
  selector: 'app-fee-schedule',
  templateUrl: './fee-schedule.component.html',
  styleUrls: ['./fee-schedule.component.scss']
})
export class FeeScheduleComponent implements OnInit {
  usersData = usersData;
  columns = [
    {
      key: 'cpt',
      label: 'CPT',
    },
    'unitType',
    'perUnit',
    'chargeAmount',
    {
      key:'apply',
      label: 'ِApply',

    },
    {
      key:'delete'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
