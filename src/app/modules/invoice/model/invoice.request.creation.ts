import { SelectedSessionServiceLine } from "../../model/invoice/select.session.service.line"


export interface InvoiceRequestCreation{
    selectedSessionServiceLines?:SelectedSessionServiceLine[]
    isOneDateServicePerClaim?:boolean
    delayedReason?:string
    patientId?:number
    insuranceCompanyId?:number
}