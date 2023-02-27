import { Component, OnInit } from '@angular/core';
import usersData from './_eradata';
@Component({
  selector: 'app-posting-era',
  templateUrl: './posting-era.component.html',
  styleUrls: ['./posting-era.component.scss']
})
export class PostingERAComponent implements OnInit {
  usersData = usersData;
  constructor() { }
  columns = [
    'DOS',
    'CPT',
    'units',
    'billed',
    'adjust',
    'paid',
    'reason',
    'patResp',
    {
      key: 'action',
      label: 'then',
    },
    {
      key: 'label',
      label: '',
    },
    {
      key: 'apply',
      label: '',
    }
  ];
  ngOnInit(): void {
  }

}
