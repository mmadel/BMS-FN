import { Component, OnInit } from '@angular/core';
import usersData from '../../../patient/list/_data';
@Component({
  selector: 'app-filling',
  templateUrl: './filling.component.html',
  styleUrls: ['./filling.component.scss']
})
export class FillingComponent implements OnInit {
  
  sestionFlag: string = "history";

  details_visible = Object.create({});
  constructor() { }

  ngOnInit(): void {
  }
  onClickSessionHistory() {
    this.sestionFlag = 'history'
  }
  onClickCMS() {
    this.sestionFlag = 'cms'
  }
  onClickAttacment() {
    this.sestionFlag = 'attach'
  }
  usersData = usersData;

  columns = [
    {
      key: 'birthDate',
      _style: { width: '20%' }
    },
    'name',
    {
      key: 'show',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false
    }
  ];

  getBadge(status: string) {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'secondary';
      case 'Pending':
        return 'warning';
      case 'Banned':
        return 'danger';
      default:
        return 'primary';
    }
  }
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
}
