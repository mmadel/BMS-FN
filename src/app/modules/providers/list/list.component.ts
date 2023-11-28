import { Component, OnInit } from '@angular/core';
import usersData from '../../patient/list/_data';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  usersData = usersData;
  addVisibility: boolean = false
  columns = [
    {
      key: 'id',
      _style: { width: '5%' }
    },
    {
      key: 'name',
      _style: { width: '50%' }
    },
    {
      key: 'view',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false
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
  toggleAddProvider() {
    this.addVisibility = !this.addVisibility
  }
  change(event: any) {
    if (event === 'close') {
      this.addVisibility = false;
    }
  }
}
