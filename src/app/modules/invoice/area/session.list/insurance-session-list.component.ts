import { Component, OnInit } from '@angular/core';
import sessionData from './_sessiondata';

@Component({
  selector: 'app-insurance-session-list',
  templateUrl: './insurance-session-list.component.html',
  styleUrls: ['./insurance-session-list.component.scss']
})
export class InsuranceSessionListComponent implements OnInit {
  sessionsData = sessionData;
  editFields: boolean = false;
  columns = [
    'DOS',
    'provider',
    'dxCase',
    'place',
    'CPT',
    'units',
    'charge',
    {
      key: 'edit',
      label: '',
      filter: false,
      sorter: false
    },
    {
      key: 'session',
      label: '',
      filter: false,
      sorter: false
    }
  ];
  toggleDetails() {
    this.editFields = !this.editFields;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
