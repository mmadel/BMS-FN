import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InsuranceCompanyContainer } from '../../model/admin/insurance.company.container';
import { InsuranceCompanyContainerService } from '../service/insurance-company-container.service';

import usersData from './_data';
//import usersData from './../../patient/list/_data';
@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.scss']
})
export class InsuranceListComponent implements OnInit {
  isuranceCompanyList$!: Observable<InsuranceCompanyContainer[]>;
  public isnsuranceSettingsVisible = false;

  columns = [
    {
      key: 'displayName',
      label: 'Name',
      _style: { width: '40%' }
    },
    {
      key: 'payerId',
      label: 'Payer Id',
      _style: { width: '40%' }
    },
    {
      key: 'actions',
      _style: { width: '5%' }
    },
  ];

  details_visible = Object.create({});
  constructor(private insuranceCompanyContainerService: InsuranceCompanyContainerService) { }

  ngOnInit(): void {
    this.isuranceCompanyList$ = this.insuranceCompanyContainerService.findInsuranceCompanyContianers();
  }

}
