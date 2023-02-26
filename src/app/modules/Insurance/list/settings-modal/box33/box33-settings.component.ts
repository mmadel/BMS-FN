import { Component, OnInit } from '@angular/core';
import usersData from '../../../../patient/list/_data';

@Component({
  selector: 'app-box33-settings',
  templateUrl: './box33-settings.component.html',
  styleUrls: ['./box33-settings.component.scss']
})
export class Box33SettingsComponent implements OnInit {


  usersData = usersData;
  

  columns = [
    {
      key: 'name',
      _style: { width: '20%' }
    },
    { key: 'email', _style: { width: '5%' } },
    {
      key: 'profile',
      label: '',
      _style: { width: '5%' },
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
