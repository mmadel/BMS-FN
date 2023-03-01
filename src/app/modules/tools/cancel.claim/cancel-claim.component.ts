import { Component, OnInit } from '@angular/core';
import usersData from './_data';
@Component({
  selector: 'app-cancel-claim',
  templateUrl: './cancel-claim.component.html',
  styleUrls: ['./cancel-claim.component.scss']
})
export class CancelClaimComponent implements OnInit {

  usersData = usersData;

  columns = [
    'name',
    'DOS',
    'insurance',
    'created',
    {
      key: 'delete',
      label: '',
      _style: { width: '20%' }
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
