export interface PaymentServiceLine{
    sessionId?:number
    ServiceCodeId?:number
    dateOfService?:number
    cpt?:string
    provider?:string
    billedValue?:number
    previousPayments?:number
    payment?:number
    adjust?:number
    balance?:number
}