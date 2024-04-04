import { Component, OnInit } from '@angular/core';
import { InsuranceCompanyService } from '../../admin.tools/services/insurance.company/insurance-company.service';
import { PostingEmitterService } from '../../invoice/service/emitting/posting-emitter.service';
import { PatientService } from '../../patient/service/patient.service';

@Component({
    selector: 'app-batch-insurnace-payment',
    templateUrl: './batch-insurnace-payment.component.html',
    styleUrls: ['./batch-insurnace-payment.component.scss']
})
export class BatchInsurnacePaymentComponent implements OnInit {

    constructor() {
    }
    ngOnInit(): void {}
}
