import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IsuranceCompany } from 'src/app/modules/model/admin/insurance.company';
import { InsuranceCompanyService } from '../../../services/insurance.company/insurance-company.service';

@Component({
  selector: 'app-insurance-mapping',
  templateUrl: './insurance-mapping.component.html',
  styleUrls: ['./insurance-mapping.component.scss']
})
export class InsuranceMappingComponent implements OnInit {
  isuranceCompanies$!: Observable<IsuranceCompany[]>;
  columns = [
    {
      key: 'name',
    },
    {
      key: 'mapping',
      label: 'Assign',
      _style: { width: '10%' },
      filter: false,
      sorter: false
    },
  ];
  details_visible = Object.create({});
  constructor(private insuranceCompanyService: InsuranceCompanyService) { }
  public toggleDetails(item: any) {
    this.details_visible[item - 1] = !this.details_visible[item - 1];
  }
  ngOnInit(): void {
    this.isuranceCompanies$ = this.insuranceCompanyService.findAll();
  }
  onSelectedInsuranceCompany(even: any) {
    console.log(JSON.stringify(even))
  }
  assignSelected() {
  }
  mapInsuranceCompany(event: any) {
    if (event === 'mapped'){
      this.ngOnInit();
    }
  }
}
