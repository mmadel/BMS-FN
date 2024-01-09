import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InsuranceCompanyEmittingService } from 'src/app/modules/admin.tools/services/emitting/insurance-company-emitting.service';
import { InsuranceCompanyService } from 'src/app/modules/admin.tools/services/insurance.company/insurance-company.service';
import { IsuranceCompany } from 'src/app/modules/model/admin/insurance.company';
import { IsuranceCompanyMapper } from 'src/app/modules/model/admin/insurance.company.mapper';
import { Payer } from 'src/app/modules/model/admin/payer';

@Component({
  selector: 'assign-payer',
  templateUrl: './assign-payer.component.html',
  styleUrls: ['./assign-payer.component.scss']
})
export class AssignPayerComponent implements OnInit {

  payerNames: string[];
  payerIds: string[];
  selectedpayerName: string;
  selectedpayerId: string;
  assignedPayer: Payer;
  @Input() insuranceCompany: IsuranceCompany;
  @Input() payer!: Payer[];
  @Output() onMapChanged = new EventEmitter<string>()
  constructor(private insuranceCompanyService: InsuranceCompanyService
    , private toastr: ToastrService
    , private insuranceCompanyEmittingService: InsuranceCompanyEmittingService) { }

  ngOnInit(): void {
    this.getAssignedPayer();
    this.payerNames = this.payer.map(a => a.displayName);
    this.payerIds = this.payer.map(a => a.payerId.toString());
  }
  pickName(event: any) {
    this.payer.forEach(element => {
      if (element.displayName === event) {
        this.selectedpayerId = element.payerId.toString();
      }
    });
    this.insuranceCompanyEmittingService.selectedInsuranceCompany$.next(
      {
        id: this.insuranceCompany.id,
        payerId: Number(this.selectedpayerId)
      }
    )
  }
  unPickName() {
    this.selectedpayerId = '';
  }
  pickId(event: any) {
    this.payer.forEach(element => {
      if (element.payerId.toString() === event) {
        this.selectedpayerName = element.displayName;
      }
    });
    this.insuranceCompanyEmittingService.selectedInsuranceCompany$.next(
      {
        id: this.insuranceCompany.id,
        payerId: Number(event)
      }
    )
  }
  unPickId() {
    this.selectedpayerName = '';
  }
  assign() {
    var isuranceCompanyMapper: IsuranceCompanyMapper = {
      insuranceCompanyId: this.insuranceCompany.id,
      payerId: Number(this.selectedpayerId)
    }
    this.insuranceCompanyService.map(isuranceCompanyMapper)
      .subscribe((result) => {
        this.onMapChanged.emit('mapped');
        this.toastr.success("payer assigned to insurance company")
      })
  }
  getAssignedPayer() {
    if (this.insuranceCompany.payerId) {
      this.payer.forEach(element => {
        if (element.payerId.toString() === this.insuranceCompany.payerId.toString()) {
          this.assignedPayer = {
            displayName: element.displayName,
            payerId: element.payerId
          }
        }
      });
    }
  }
}
