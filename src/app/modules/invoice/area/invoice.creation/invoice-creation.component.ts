import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { InvoiceRequestCreation } from '../../model/invoice.request.creation';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice-creation',
  templateUrl: './invoice-creation.component.html',
  styleUrls: ['./invoice-creation.component.scss']
})
export class InvoiceCreationComponent implements OnInit {
  @Input() patientInsurances: PatientInsurance[]
  @Input() selectedServiceCodeIds: number[];
  @Output() changeVisibility = new EventEmitter<string>()
  filterpatientInsurances: PatientInsurance[]
  constructor(private invoiceService: InvoiceService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.selectedServiceCodeIds))
    this.filterpatientInsurances = this.patientInsurances.filter(insuranceCompany => { return !insuranceCompany.isArchived; })
  }

  create(patientInsurance: PatientInsurance) {
    var invoiceRequestCreation: InvoiceRequestCreation = {
      serviceCodeIds: this.selectedServiceCodeIds,
      isOneDateServicePerClaim: false,
      delayedReason: '',
      invoicedInsuranceCompany: {
        payerId: Number(patientInsurance.patientInsurancePolicy.payerId),
        payerName: patientInsurance.patientInsurancePolicy.payerName,
        PrimaryId: patientInsurance.patientInsurancePolicy.primaryId,
      }
    }
    this.invoiceService.create(invoiceRequestCreation)
      .subscribe(() => {
        this.toastr.success("Invocie created successfully ")
        this.changeVisibility.emit('close');
      }, error => {
        this.toastr.error("error in create invoice")
      })
  }
}
