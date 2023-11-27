import { Component, OnInit } from '@angular/core';
import usersData from '../../../list/_data';

@Component({
  selector: 'app-pateint-session-list',
  templateUrl: './pateint-session-list.component.html',
  styleUrls: ['./pateint-session-list.component.scss']
})
export class PateintSessionListComponent implements OnInit {
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
  details_visible = Object.create({});
  constructor() { }

  ngOnInit(): void {
  }
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
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
}
