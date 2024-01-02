import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { PatientInsurance } from 'src/app/modules/model/clinical/patient.insurance';
import { SelectedSessionServiceLine } from 'src/app/modules/model/invoice/select.session.service.line';
import { PatientService } from 'src/app/modules/patient/service/patient.service';
import { ClientSessionResponse } from '../../model/client.session.response';
import { InvoiceRequestCreation } from '../../model/invoice.request.creation';
import { InvoiceEmitterService } from '../../service/emitting/invoice-emitter.service';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice-creation',
  templateUrl: './invoice-creation.component.html',
  styleUrls: ['./invoice-creation.component.scss']
})
export class InvoiceCreationComponent implements OnInit {
  @Input() clientId: number
  @Input() patientInsurances: PatientInsurance[]
  @Input() selectedSessionServiceLine: SelectedSessionServiceLine[];
  @Output() changeVisibility = new EventEmitter<string>()
  filterpatientInsurances: PatientInsurance[]
  constructor(private invoiceService: InvoiceService
    , private toastr: ToastrService
    , private patientService: PatientService
    , private invoiceEmitterService: InvoiceEmitterService) { }

  ngOnInit(): void {
    console.log(this.clientId)
    this.filterpatientInsurances = this.patientInsurances.filter(insuranceCompany => { return !insuranceCompany.isArchived; })
  }

  create(patientInsurance: PatientInsurance) {
    var invoiceRequestCreation: InvoiceRequestCreation = {
      selectedSessionServiceLines: this.selectedSessionServiceLine,
      isOneDateServicePerClaim: false,
      delayedReason: '',
      patientId: this.clientId,
      insuranceCompanyId:patientInsurance.insuranceCompany
    }
    this.invoiceService.create(invoiceRequestCreation)
      .subscribe((response) => {
        this.toastr.success("Invocie created successfully ")
        this.changeVisibility.emit('close');
        this.findCleint();
        this.constructExportedFile(response, 'cms-','pdf')
      }, error => {
        console.log(JSON.stringify(error))
        this.toastr.error("error in create invoice")
      })
  }
  constructExportedFile(response: any, fileName: string, extention:string) {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(response)
    a.href = objectUrl
    var nameDatePart = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    a.download = fileName + nameDatePart + '.' +extention;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }
  private findCleint() {
    this.invoiceService.findByClient(this.clientId)
      .subscribe((result) => {
        console.log('findCleint ' + this.clientId)
        this.emitChanges(result);
      })
  }
  private emitChanges(pateint: Patient) {
    console.log('emitChanges')
    var clientSessionResponse: ClientSessionResponse
    if (pateint !== null) {
      clientSessionResponse= {
        sessions: pateint.sessions,
        client: pateint
      }
    }else
    clientSessionResponse = {
      sessions : new Array(),
      client : {}

    }

    this.invoiceEmitterService.selectedInvoiceClientSession$.next(clientSessionResponse)
  }

}
