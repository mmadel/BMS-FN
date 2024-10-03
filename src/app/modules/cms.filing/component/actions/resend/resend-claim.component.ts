import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { InvocieRequestCreator } from 'src/app/modules/invoice/invoice.creator/invocie.request.creator';
import { InvoiceRequest } from 'src/app/modules/invoice/model/temp/invoice.request';
import { OtherPatientInsurance } from 'src/app/modules/invoice/model/temp/other.patient.insurance';
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
  constructor(private sessionHistoryService: SessionHistoryService) { }

  ngOnInit(): void {
    this.prepare();
  }

  private prepare() {
    this.sessionHistoryService.prepareClaimToSend(this.patientId, this.submissionId).pipe(
      map((result: any) => {
        var patient: Patient = result.patient;
        var patientInsurance: PatientInsurance = this.findPatientInsurance(patient, this.insuranceCompany)
        var filterpatientInsurances: PatientInsurance[] = this.activePatientInsurance(patient.patientInsurances);
        var otherPAtientInsurances: any[] = this.constructOtherInsurances(patientInsurance, filterpatientInsurances);
        var invoiceRequest: InvoiceRequest = InvocieRequestCreator.create(patient, patientInsurance, filterpatientInsurances.length, otherPAtientInsurances);
        invoiceRequest.selectedSessionServiceLine = result.serviceLines
        return invoiceRequest;
      })
    ).subscribe(result => {
      console.log(JSON.stringify(result))
    })
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

}
