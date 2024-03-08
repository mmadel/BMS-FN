import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs';
import { InsuranceCompanyService } from 'src/app/modules/admin.tools/services/insurance.company/insurance-company.service';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { SelectedSessionServiceLine } from 'src/app/modules/model/invoice/select.session.service.line';
import { InvocieRequestCreator } from '../../invoice.creator/invocie.request.creator';
import { InvoiceRequest } from '../../model/temp/invoice.request';
import { OtherPatientInsurance } from '../../model/temp/other.patient.insurance';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice-creation',
  templateUrl: './invoice-creation.component.html',
  styleUrls: ['./invoice-creation.component.scss']
})
export class InvoiceCreationComponent implements OnInit {
  @Input() client: Patient
  @Input() patientInsurances: PatientInsurance[]
  @Input() selectedSessionServiceLine: SelectedSessionServiceLine[];
  @Output() changeVisibility = new EventEmitter<string>()
  isCorrectClaim: boolean;
  CorrectClaimVisibility: boolean;
  correctCode: string = '7';
  refNumber?: string;
  invoiceRequest: InvoiceRequest;
  filterpatientInsurances: PatientInsurance[]
  patientInsurance: PatientInsurance;
  avoidCorrectClaimFlag: boolean = false;
  constructor(private invoiceService: InvoiceService
    , private toastr: ToastrService
    , private insuranceCompanyService: InsuranceCompanyService) { }

  ngOnInit(): void {
    this.filterpatientInsurances = this.patientInsurances.filter(insuranceCompany => { return !insuranceCompany.isArchived; })
  }
  constructInsuranceCompnayTitle(patientInsurance: PatientInsurance): string {
    var insuranceCompanyTitle: string;
    if (patientInsurance.visibility === 'External')
      insuranceCompanyTitle = patientInsurance.insuranceCompany[0];
    if (patientInsurance.visibility === 'Internal' && patientInsurance.assigner === null)
      insuranceCompanyTitle = patientInsurance.insuranceCompany[0];
    if (patientInsurance.visibility === 'Internal' && patientInsurance.assigner !== null)
      insuranceCompanyTitle = patientInsurance.insuranceCompany[0] + ' assinged to (' + patientInsurance.assigner[1] + ')';
    return insuranceCompanyTitle;
  }

  create(patientInsurance: PatientInsurance) {
    this.patientInsurance = patientInsurance;
    var otherPAtientInsurances: any[] = this.constructOtherInsurances(patientInsurance);
    this.invoiceRequest = InvocieRequestCreator.create(this.client, patientInsurance, this.filterpatientInsurances.length
      , otherPAtientInsurances);
    this.invoiceRequest.selectedSessionServiceLine = this.selectedSessionServiceLine;
    this.checkIsCorrectServiceLines(this.selectedSessionServiceLine)
    if (!this.CorrectClaimVisibility) {
      this.execute(patientInsurance)
    }
  }
  createElectronic(patientInsurance: PatientInsurance) {
    var invoiceRequest: InvoiceRequest = InvocieRequestCreator.create(this.client, patientInsurance, this.filterpatientInsurances.length, null);
    invoiceRequest.selectedSessionServiceLine = this.selectedSessionServiceLine;
    if (!this.CorrectClaimVisibility) {
      this.insuranceCompanyService.findElementInsuranceCompanyConfiguration(Number(patientInsurance.insuranceCompany[1])
        , patientInsurance.visibility).pipe(
          tap((result) => {
            this.constructBillingProviderInformation(invoiceRequest, result)
          }),
          switchMap(() => this.invoiceService.createElectronic(invoiceRequest))
        ).subscribe((response) => {
          this.toastr.success("Invocie created successfully ")
          this.changeVisibility.emit('invoice');
          this.constructExportedFile(response, 'cms-', 'json')
        },
          (error) => {
            this.toastr.error(error.error.message, 'Error In Creation');
          })
    }

  }
  execute(patientInsurance: PatientInsurance) {
    this.insuranceCompanyService.findElementInsuranceCompanyConfiguration(Number(patientInsurance.insuranceCompany[1])
      , patientInsurance.visibility).pipe(
        tap((result) => {
          this.constructBillingProviderInformation(this.invoiceRequest, result)
        }),
        switchMap(() => this.invoiceService.create(this.invoiceRequest))
      ).subscribe((response) => {
        this.toastr.success("Invocie created successfully ")
        this.changeVisibility.emit('invoice');
        this.constructExportedFile(response, 'cms-', 'pdf')
      }, (error) => {
        
        this.toastr.error('Over Lapping Patient Authorization', 'Error In Creation');
      })
  }
  constructExportedFile(response: any, fileName: string, extention: string) {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(response)
    a.href = objectUrl
    var nameDatePart = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    a.download = fileName + nameDatePart + '.' + extention;
    a.click();
    URL.revokeObjectURL(objectUrl);
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
  private constructOtherInsurances(patientInsurance: PatientInsurance): OtherPatientInsurance[] {
    var result: OtherPatientInsurance[] = new Array();
    this.filterpatientInsurances.filter(obj => obj.id !== patientInsurance.id)
      .forEach(element => {
        var otherPatientInsurance: OtherPatientInsurance;
        var patientRelationName = element.patientRelation.r_lastName + ',' + element.patientRelation.r_firstName;
        otherPatientInsurance = {
          insuredName: patientRelationName,
          policyGroup: element.patientInsurancePolicy.policyGroup,
          planName: element.patientInsurancePolicy.plan,
          responsibility: element.patientInsurancePolicy.responsibility,
          createdAt: element.createdAt
        }
        result.push(otherPatientInsurance);
      });
    return result;
  }

  private checkIsCorrectServiceLines(selectedSessionServiceLine: SelectedSessionServiceLine[]) {
    var isCorrect = selectedSessionServiceLine.every(obj => obj.serviceLine.isCorrect);
    this.isCorrectClaim = isCorrect;
    if (this.isCorrectClaim)
      this.CorrectClaimVisibility = true;
  }
  toggleIsCorrect() {
    this.CorrectClaimVisibility = !this.CorrectClaimVisibility;
  }
  setCorrectClaim() {
    this.invoiceRequest.correctClaimInformation = {
      resubmissionCode: !this.avoidCorrectClaimFlag ? this.correctCode : null,
      refNumber: !this.avoidCorrectClaimFlag ? this.refNumber : null
    }
    this.toggleIsCorrect();
    this.execute(this.patientInsurance)
  }
}

