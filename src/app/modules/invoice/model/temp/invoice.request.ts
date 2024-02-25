import { SelectedSessionServiceLine } from "src/app/modules/model/invoice/select.session.service.line";
import { CorrectClaimInformation } from "./correct.claim.information";
import { InvoiceBillingProviderInformation } from "./invoice.billing.provider.information";
import { InvoiceInsuranceCompanyInformation } from "./invoice.insurance.company.information";
import { InvoicePatientInformation } from "./invoice.patient.information";
import { InvoicePatientInsuredInformation } from "./invoice.patientInsured.information";
import { InvoiceRequestConfiguration } from "./invoice.request.configuration";

export interface InvoiceRequest {
    selectedSessionServiceLine?: SelectedSessionServiceLine[];
    patientInformation: InvoicePatientInformation;
    invoicePatientInsuredInformation: InvoicePatientInsuredInformation;
    invoiceInsuranceCompanyInformation:InvoiceInsuranceCompanyInformation 
    invoiceBillingProviderInformation:InvoiceBillingProviderInformation ;
    invoiceRequestConfiguration:InvoiceRequestConfiguration
    correctClaimInformation?:CorrectClaimInformation
}