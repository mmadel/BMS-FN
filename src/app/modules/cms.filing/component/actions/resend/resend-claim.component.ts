import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs';
import { InsuranceCompanyService } from 'src/app/modules/admin.tools/services/insurance.company/insurance-company.service';
import { InvocieRequestCreator } from 'src/app/modules/invoice/invoice.creator/invocie.request.creator';
import { InvoiceRequest } from 'src/app/modules/invoice/model/temp/invoice.request';
import { OtherPatientInsurance } from 'src/app/modules/invoice/model/temp/other.patient.insurance';
import { InvoiceService } from 'src/app/modules/invoice/service/invoice.service';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { SessionHistoryService } from '../../../service/session-history.service';

@Component({
  selector: 'resend-claim',
  templateUrl: './resend-claim.component.html',
  styleUrls: ['./resend-claim.component.scss']
})
export class ResendClaimComponent implements OnInit {
  @Input() submissionId: number
  @Input() insuranceCompany: string;
  @Input() patientId: number
  @Output() changeVisibility = new EventEmitter<string>()
  invoicerequest: InvoiceRequest;
  constructor(private sessionHistoryService: SessionHistoryService,
    private insuranceCompanyService: InsuranceCompanyService,
    private invoiceService: InvoiceService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.prepare().pipe(
      switchMap((result) => this.prepareBillingProviderInformation(result[0], result[1])),
    ).subscribe(result => {
      this.invoicerequest = result;
    })
  }

  private prepare() {
    return this.sessionHistoryService.prepareClaimToSend(this.patientId, this.submissionId).pipe(
      map((result: any) => {
        var value: any[] = []
        var patient: Patient = result.patient;
        var patientInsurance: PatientInsurance = this.findPatientInsurance(patient, this.insuranceCompany)
        var filterpatientInsurances: PatientInsurance[] = this.activePatientInsurance(patient.patientInsurances);
        var otherPAtientInsurances: any[] = this.constructOtherInsurances(patientInsurance, filterpatientInsurances);
        var invoiceRequest: InvoiceRequest = InvocieRequestCreator.create(patient, patientInsurance, filterpatientInsurances.length, otherPAtientInsurances);
        invoiceRequest.selectedSessionServiceLine = result.serviceLines
        invoiceRequest.submissionType = 'Electronic'
        value[0] = invoiceRequest;
        value[1] = patientInsurance;
        return value;
      })
    )
  }
  private prepareBillingProviderInformation(invoiceRequest: InvoiceRequest, patientInsurance: PatientInsurance) {

    return this.insuranceCompanyService.findElementInsuranceCompanyConfiguration(Number(patientInsurance.insuranceCompany[1])
      , patientInsurance.visibility)
      .pipe(
        map((result: any) => {
          this.constructBillingProviderInformation(invoiceRequest, result)
          return invoiceRequest;
        })
      )
  }

  private findPatientInsurance(patient: Patient, insuranceCompany: string): PatientInsurance {
    var patientInsurance: PatientInsurance;
    for (let i = 0; i < patient.patientInsurances.length; i++) {
      if (patient.patientInsurances[i].insuranceCompany[0] === insuranceCompany)
        patientInsurance = patient.patientInsurances[i]
    }
    return patientInsurance;
  }
  private activePatientInsurance(patientInsurances: PatientInsurance[]): PatientInsurance[] {
    return patientInsurances.filter(
      (insurance) => insurance.isArchived
    )
  }
  private constructOtherInsurances(patientInsurance: PatientInsurance, activePatientInsurances: PatientInsurance[]): OtherPatientInsurance[] {
    var result: OtherPatientInsurance[] = new Array();
    activePatientInsurances.filter(obj => obj.id !== patientInsurance.id)
      .forEach(element => {
        var otherPatientInsurance: OtherPatientInsurance;
        var patientRelationName = element.patientRelation.r_lastName + ',' + element.patientRelation.r_firstName;
        otherPatientInsurance = {
          insuredName: patientRelationName,
          policyGroup: element.patientInsurancePolicy.policyGroup,
          planName: element.patientInsurancePolicy.plan,
          responsibility: element.patientInsurancePolicy.responsibility,
          createdAt: element.createdAt,
          assigner: element.assigner
        }
        result.push(otherPatientInsurance);
      });
    return result;
  }
  private constructBillingProviderInformation(invoiceRequest: InvoiceRequest, result: any) {
    invoiceRequest.invoiceBillingProviderInformation.businessName = result[0];
    invoiceRequest.invoiceBillingProviderInformation.address = result[1];
    invoiceRequest.invoiceBillingProviderInformation.city_state_zip = result[2];
    invoiceRequest.invoiceBillingProviderInformation.phone = result[3]
    invoiceRequest.invoiceBillingProviderInformation.taxId = result[4]
    invoiceRequest.patientInformation.box26 = result[5]
    invoiceRequest.invoiceBillingProviderInformation.npi = result[6]
    invoiceRequest.invoiceBillingProviderInformation.taxonomy = result[7]
  }
  resend() {
    this.invoiceService.createElectronic(this.invoicerequest).subscribe(result => {
      this.toastrService.success('Claim re-send')
      this.changeVisibility.emit('resend');
      this.scrollUp();
    }, error => {
      this.toastrService.error('error during re-sending claim')
      this.scrollUp();
    })
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}
