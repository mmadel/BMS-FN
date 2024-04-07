export interface BatchSessionServiceLinePayment{
    serviceLineId?:number
    dos?:number
    cpt?:string
    provider?:string
    balance?:number
    payment?:number
    adjust?:number
    previousPayment?:number
    charge?:number;
    serviceLinePaymentAction?:string
    createdAt?:number
}