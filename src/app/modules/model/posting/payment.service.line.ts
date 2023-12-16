export interface PaymentServiceLine{
    sessionId?:number
    ServiceCodeId?:number
    dateOfService?:number
    cpt?:string
    provider?:string
    billedValue?:number
}