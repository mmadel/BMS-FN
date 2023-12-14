import { InvoicedInsuranceCompany } from "./invoice.insurance.company"

export interface InvoiceRequestCreation{
    serviceCodeIds?:number[]
    isOneDateServicePerClaim?:boolean
    delayedReason?:string
    invoicedInsuranceCompany?:InvoicedInsuranceCompany
}