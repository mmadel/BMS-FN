import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs';
import { InsuranceCompanyService } from 'src/app/modules/admin.tools/services/insurance.company/insurance-company.service';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { SelectedSessionServiceLine } from 'src/app/modules/model/invoice/select.session.service.line';
import { InvocieRequestCreator } from '../../invoice.creator/invocie.request.creator';
import { ClientSessionResponse } from '../../model/client.session.response';
import { InvoiceRequest } from '../../model/temp/invoice.request';
import { InvoiceEmitterService } from '../../service/emitting/invoice-emitter.service';
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
  filterpatientInsurances: PatientInsurance[]
  constructor(private invoiceService: InvoiceService
    , private toastr: ToastrService
    , private invoiceEmitterService: InvoiceEmitterService
    , private insuranceCompanyService: InsuranceCompanyService) { }

  ngOnInit(): void {
    this.filterpatientInsurances = this.patientInsurances.filter(insuranceCompany => { return !insuranceCompany.isArchived; })
  }

  create(patientInsurance: PatientInsurance) {
    var invoiceRequest: InvoiceRequest = InvocieRequestCreator.create(this.client, patientInsurance);
    invoiceRequest.selectedSessionServiceLine = this.selectedSessionServiceLine;
    this.insuranceCompanyService.findInsuranceCompanyConfiguration(Number(patientInsurance.insuranceCompany[1])
      , patientInsurance.visibility).pipe(
        tap((result) => {
          invoiceRequest.invoiceBillingProviderInformation.businessName = result[0];
          invoiceRequest.invoiceBillingProviderInformation.address = result[1];
          invoiceRequest.invoiceBillingProviderInformation.city_state_zip = result[2];
          invoiceRequest.invoiceBillingProviderInformation.phone = result[3]
          invoiceRequest.invoiceBillingProviderInformation.taxId = result[4]
          invoiceRequest.patientInformation.box26 = result[4]
          console.log(JSON.stringify(invoiceRequest))
        }),
        switchMap(() => this.invoiceService.create(invoiceRequest))
      ).subscribe((response) => {
        this.toastr.success("Invocie created successfully ")
        this.changeVisibility.emit('close');
        this.findCleint();
        this.constructExportedFile(response, 'cms-', 'pdf')
      }, error => {
        this.toastr.error("error in create invoice")
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
  private findCleint() {
    this.invoiceService.findByClient(this.client.id)
      .subscribe((result) => {
        this.emitChanges(result);
      })
  }
  private emitChanges(pateint: Patient) {
    var clientSessionResponse: ClientSessionResponse
    if (pateint !== null) {
      clientSessionResponse = {
        sessions: pateint.sessions,
        client: pateint
      }
    } else
      clientSessionResponse = {
        sessions: new Array(),
        client: {}

      }

    this.invoiceEmitterService.selectedInvoiceClientSession$.next(clientSessionResponse)
  }

}
