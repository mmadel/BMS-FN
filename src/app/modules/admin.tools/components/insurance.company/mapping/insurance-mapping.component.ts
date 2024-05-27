import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter, first, Observable } from 'rxjs';
import { IsuranceCompany } from 'src/app/modules/model/admin/insurance.company';
import { IsuranceCompanyMapper } from 'src/app/modules/model/admin/insurance.company.mapper';
import { Payer } from 'src/app/modules/model/admin/payer';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { InsuranceCompanyEmittingService } from '../../../services/emitting/insurance-company-emitting.service';
import { InsuranceCompanyService } from '../../../services/insurance.company/insurance-company.service';
import { PayerService } from '../../../services/payer/payer.service';

@Component({
  selector: 'app-insurance-mapping',
  templateUrl: './insurance-mapping.component.html',
  styleUrls: ['./insurance-mapping.component.scss']
})
export class InsuranceMappingComponent implements OnInit {
  isuranceCompanies$!: Observable<IsuranceCompany[]>;
  selectedIsuranceCompany: IsuranceCompany;
  isnsuranceMapperVisible: boolean = false;
  columns = [
    {
      key: 'name',
    },
    {
      key: 'mapped',
      label: 'Status',
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
  payer!: Payer[]
  componentScopes: string[] = [Role.ADMIN_TOOL_ROLE, Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE ];
  constructor(private insuranceCompanyService: InsuranceCompanyService
    , private toastr: ToastrService
    , private payerService: PayerService) { }
  public toggleDetails(item: any) {
    this.isnsuranceMapperVisible = true;
    this.selectedIsuranceCompany = item;
  }
  ngOnInit(): void {
    this.find();
    this.findPayers();
  }
  find() {
    this.isuranceCompanies$ = this.insuranceCompanyService.findInternal();
  }
  findPayers() {
    this.payerService.findAll().subscribe((result: any) => {
      this.payer = result;
    })
  }

  public toggleInsuranceMapperSettings() {
    this.isnsuranceMapperVisible = !this.isnsuranceMapperVisible
  }
  mapInsuranceCompany(event: any) {
    if (event === 'mapped') {
      this.isnsuranceMapperVisible = false;
      this.ngOnInit()
    }
  }
}
