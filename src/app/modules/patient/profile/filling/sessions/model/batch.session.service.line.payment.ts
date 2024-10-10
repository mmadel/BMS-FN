export interface BatchSessionServiceLinePayment{
    serviceLineId?:number
    dos?:number
    cpt?:string
    provider?:string
    balance?:number
    payment?:number
    tmpPreviousPayment?:number
    adjust?:number
    tmpPreviousAdjust?:number
    previousPayment?:number
    charge?:number;
    serviceLinePaymentAction?:string
    createdAt?:number
    sessionId?:number
}