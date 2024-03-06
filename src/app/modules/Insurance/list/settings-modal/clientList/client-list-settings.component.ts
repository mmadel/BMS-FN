import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-client-list-settings',
  templateUrl: './client-list-settings.component.html',
  styleUrls: ['./client-list-settings.component.scss']
})
export class ClientListSettingsComponent implements OnInit {  

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
 
  constructor() { }

  ngOnInit(): void {
  }

}
