

export interface InvoiceRequestCreation{
    serviceCodeIds?:number[]
    isOneDateServicePerClaim?:boolean
    delayedReason?:string
    patientId?:number
    insuranceCompanyId?:number
}