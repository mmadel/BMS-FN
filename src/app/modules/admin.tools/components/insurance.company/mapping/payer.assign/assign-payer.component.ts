import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PayerService } from 'src/app/modules/admin.tools/services/payer/payer.service';
import { IsuranceCompany } from 'src/app/modules/model/admin/insurance.company';
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
  @Input() insuranceCompany: IsuranceCompany;
  constructor(private payerService: PayerService) { }

  ngOnInit(): void {
    this.payerService.findAll().subscribe((result: any) => {
      this.payer = result;
      this.payerNames = this.payer.map(a => a.displayName);
      this.payerIds = this.payer.map(a => a.id.toString());
    })
  }
  pickName(event: any) {
    this.payer.forEach(element => {
      if (element.displayName === event) {
        this.selectedpayerId = element.id.toString();
      }
    });
  }
  unPickName() {
    this.selectedpayerId = '';
  }
  pickId(event: any) {
    this.payer.forEach(element => {
      if (element.id.toString() === event) {
        this.selectedpayerName = element.displayName;
      }
    });
  }
  unPickId() {
    this.selectedpayerName = '';
  }
}
