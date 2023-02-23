import { Component, OnInit } from '@angular/core';
import usersData from '../../patient/list/_data';
@Component({
  selector: 'app-referring-provider-list',
  templateUrl: './referring-provider-list.component.html',
  styleUrls: ['./referring-provider-list.component.scss']
})
export class ReferringProviderListComponent implements OnInit {

  usersData = usersData;
  columns = [
    {
      key: 'name',
      _style: { width: '20%' }
    },
    {
      key: 'id',
      _style: { width: '5%' }
    },
    {
      key: 'edit',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false
    },
    {
      key: 'delete',
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
