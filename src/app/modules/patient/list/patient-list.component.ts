import { Component, OnInit } from '@angular/core';
import usersData from './_data';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
  }
  usersData = usersData;
  

  columns = [
    {
      key: 'name',
      _style: { width: '30%' }
    },
    { key: 'birthDate', _style: { width: '10%' } },
    { key: 'email', _style: { width: '20%' } },
    { key: 'insurance', _style: { width: '15%' } },
    {
      key: 'show',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false
    },
    {
      key: 'delete',
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

}
