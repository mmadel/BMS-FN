import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import usersData from '../../../patient/list/_data';
@Component({
  selector: 'app-insurance-patient-list',
  templateUrl: './insurance-patient-list.component.html',
  styleUrls: ['./insurance-patient-list.component.scss']
})
export class InsurancePatientListComponent implements OnInit {  
  usersData = usersData;


  columns = [
    {
      key: 'name',
      _style: { width: '40%' }
    },
    'CPT',
    { key: 'primaryinsurance', _style: { width: '25%' } },
    { key: 'secondaryinsurance', _style: { width: '25%' } },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
