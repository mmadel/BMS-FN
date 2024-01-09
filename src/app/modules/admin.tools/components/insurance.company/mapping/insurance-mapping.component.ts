import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter, first, Observable } from 'rxjs';
import { IsuranceCompany } from 'src/app/modules/model/admin/insurance.company';
import { IsuranceCompanyMapper } from 'src/app/modules/model/admin/insurance.company.mapper';
import { Payer } from 'src/app/modules/model/admin/payer';
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
  selected: IsuranceCompany[];
  changed: IsuranceCompany[] = new Array();
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
  payer!: Payer[]
  constructor(private insuranceCompanyService: InsuranceCompanyService
    , private insuranceCompanyEmittingService: InsuranceCompanyEmittingService
    , private toastr: ToastrService
    , private payerService: PayerService) { }
  public toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
  ngOnInit(): void {
    this.find();
    this.findPayers();
    this.insuranceCompanyEmittingService.selectedInsuranceCompany$.pipe(
      filter((result) => result !== null)
    ).subscribe((result: any) => {
      this.changed.push(result)
    })
  }
  find() {
    this.isuranceCompanies$ = this.insuranceCompanyService.findAll();
  }
  findPayers() {
    this.payerService.findAll().subscribe((result: any) => {
      this.payer = result;
    })
  }

  onSelectedInsuranceCompany(event: any) {
    this.selected = event;
  }
  assignSelected() {
    this.selected.forEach(selectedElement => {
      this.changed.forEach(changedElement => {
        if (selectedElement.id === changedElement.id)
          selectedElement.payerId = changedElement.payerId
      })
    });
    var isuranceCompanyMappers: IsuranceCompanyMapper[] = this.selected.map(selectedInsuranceCompany => ({
      insuranceCompanyId: selectedInsuranceCompany.id,
      payerId: selectedInsuranceCompany.payerId
    }));
    this.insuranceCompanyService.mapAll(isuranceCompanyMappers)
      .subscribe((result) => {
        this.find();
        this.toastr.success("payer assigned to selected insurance companies")
      })
  }
  mapInsuranceCompany(event: any) {
    if (event === 'mapped') {
      this.ngOnInit();
    }
  }
}
