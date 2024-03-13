import { Patient } from "../../model/clinical/patient";
import { PatientInsurance } from "../../model/clinical/patient.insurance";
import { InvoiceBillingProviderInformation } from "../model/temp/invoice.billing.provider.information";
import { InvoiceInsuranceCompanyInformation } from "../model/temp/invoice.insurance.company.information";
import { InvoicePatientInformation } from "../model/temp/invoice.patient.information";
import { InvoicePatientInsuredInformation } from "../model/temp/invoice.patientInsured.information";
import { InvoiceRequest } from "../model/temp/invoice.request";
import { InvoiceRequestConfiguration } from "../model/temp/invoice.request.configuration";

export class InvocieRequestCreator {
    public static create(patient: Patient, patientInsurance: PatientInsurance, activePAtientInsurances: number, otherPatientInsurance: any[]): InvoiceRequest {
        var invoiceRequest: InvoiceRequest = {
            patientInformation: this.createPatientInformation(patient, patientInsurance.patientInsurancePolicy.primaryId),
            invoicePatientInsuredInformation: this.createInvoicePatientInsuredInformation(patientInsurance),
            invoiceInsuranceCompanyInformation: this.createInvoiceInsuranceCompanyInformation(patientInsurance, activePAtientInsurances, otherPatientInsurance),
            invoiceBillingProviderInformation: this.createInvoiceBillingProviderInformation(),
            invoiceRequestConfiguration: this.fillInvoiceRequestConfiguration(patientInsurance)
        }
        return invoiceRequest;
    }
    private static createPatientInformation(patient: Patient, insuredPrimaryId: string): InvoicePatientInformation {
        var patientInformation: InvoicePatientInformation = {
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            dateOfBirth: patient.birthDate,
            gender: patient.gender,
            address: patient.address,
            phone: patient.phone,
            patientAdvancedInformation: patient.patientAdvancedInformation,
            ssn: patient.ssn,
            externalId: patient.externalId,
            box26: "",
            referringProvider: patient.referringProvider,
            insuredPrimaryId: insuredPrimaryId,
            authorizationInformation: patient.authorizationInformation
        }
        return patientInformation;
    }
    private static createInvoicePatientInsuredInformation(patientInsurance: PatientInsurance): InvoicePatientInsuredInformation {
        var invoicePatientInsuredInformation: InvoicePatientInsuredInformation = {
            primaryId: patientInsurance.patientInsurancePolicy.primaryId,
            relationToInsured: patientInsurance.relation,
            firstName: patientInsurance.patientRelation.r_firstName,
            lastName: patientInsurance.patientRelation.r_lastName,
            dateOfBirth: patientInsurance.patientRelation.r_birthDate,
            gender: patientInsurance.patientRelation.r_gender,
            address: patientInsurance.patientRelation.r_address,
            phone: patientInsurance.patientRelation.r_phone
        }
        return invoicePatientInsuredInformation;
    }
    private static createInvoiceInsuranceCompanyInformation(patientInsurance: PatientInsurance, activeCards: number, otherPatientInsurance: any[]): InvoiceInsuranceCompanyInformation {
        var policyInforamtion: string[] = [patientInsurance.patientInsurancePolicy.policyGroup,
        patientInsurance.patientInsurancePolicy.plan,
        patientInsurance.patientInsurancePolicy.responsibility,
        patientInsurance.patientInsurancePolicy.claimCasualty
        ];
        var invoiceInsuranceCompanyInformation: InvoiceInsuranceCompanyInformation = {
            name: patientInsurance.insuranceCompany[0],
            id: Number(patientInsurance.insuranceCompany[1]),
            address: patientInsurance.insuranceCompanyAddress,
            visibility: patientInsurance.visibility,
            assigner: patientInsurance.assigner,
            isAssignment: patientInsurance.patientInsuranceAdvanced.acceptAssigment,
            signature: patientInsurance.patientInsuranceAdvanced.informationRelease,
            insuranceType: patientInsurance.patientInsurancePolicy.planType,
            numberOfActivePatientInsurances: activeCards,
            policyInformation: policyInforamtion,
            otherInsurances: otherPatientInsurance
        }
        return invoiceInsuranceCompanyInformation
    }
    private static createInvoiceBillingProviderInformation(): InvoiceBillingProviderInformation {
        var invoiceBillingProviderInformation: InvoiceBillingProviderInformation = {
            businessName: "",
            phone: "",
            ssn: "",
            taxId: "",
            address: "",
            city_state_zip: ""
        }
        return invoiceBillingProviderInformation;
    }
    private static fillInvoiceRequestConfiguration(patientInsurance: PatientInsurance): InvoiceRequestConfiguration {
        var invoiceRequestConfiguration: InvoiceRequestConfiguration = {
            delayedReason: "",
            isOneDateServicePerClaim: patientInsurance.datePerClaim
        }
        return invoiceRequestConfiguration;
    }
}