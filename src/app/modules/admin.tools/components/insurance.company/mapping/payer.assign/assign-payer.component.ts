import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { InsuranceCompanyService } from 'src/app/modules/admin.tools/services/insurance.company/insurance-company.service';
import { PayerService } from 'src/app/modules/admin.tools/services/payer/payer.service';
import { IsuranceCompany } from 'src/app/modules/model/admin/insurance.company';
import { IsuranceCompanyMapper } from 'src/app/modules/model/admin/insurance.company.mapper';
import { Payer } from 'src/app/modules/model/admin/payer';

@Component({
  selector: 'assign-payer',
  templateUrl: './assign-payer.component.html',
  styleUrls: ['./assign-payer.component.scss']
})
export class AssignPayerComponent implements OnInit {
  payer!: Payer[];
  payerNames: string[];
  payerIds: string[];
  selectedpayerName: string;
  selectedpayerId: string;
  assignedPayer: Payer;
  @Input() insuranceCompany: IsuranceCompany;
  @Output() onMapChanged = new EventEmitter<string>()
  constructor(private payerService: PayerService
    , private insuranceCompanyService: InsuranceCompanyService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.payerService.findAll().subscribe((result: any) => {
      this.payer = result;
      this.getAssignedPayer();
      this.payerNames = this.payer.map(a => a.displayName);
      this.payerIds = this.payer.map(a => a.payerId.toString());
    })
  }
  pickName(event: any) {
    this.payer.forEach(element => {
      if (element.displayName === event) {
        this.selectedpayerId = element.payerId.toString();
      }
    });
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
