import { Component, OnInit } from '@angular/core';

import usersData from './_data';
//import usersData from './../../patient/list/_data';
@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.scss']
})
export class InsuranceListComponent implements OnInit {

  usersData = usersData;

  columns = [
    {
      key: 'insuranceId',
      _style: { width: '4%' }
    },
    {
      key: 'name',
      _style: { width: '40%' }
    },
    {
      key: 'show',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false
    },
    {
      key: 'settings',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false
    }
  ];

  details_visible = Object.create({});

  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
  constructor() { }

  ngOnInit(): void {
  }

}
