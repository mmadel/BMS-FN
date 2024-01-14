import { InvoiceBillingProviderInformation } from "./invoice.billing.provider.information";
import { InvoiceInsuranceCompanyInformation } from "./invoice.insurance.company.information";
import { InvoicePatientInformation } from "./invoice.patient.information";
import { InvoicePatientInsuredInformation } from "./invoice.patientInsured.information";

export interface InvoiceRequest {
    patientInformation: InvoicePatientInformation;
    invoicePatientInsuredInformation: InvoicePatientInsuredInformation;
    invoiceInsuranceCompanyInformation:InvoiceInsuranceCompanyInformation 
    invoiceBillingProviderInformation:InvoiceBillingProviderInformation ;
}