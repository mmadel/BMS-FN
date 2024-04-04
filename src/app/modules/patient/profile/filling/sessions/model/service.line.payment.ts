export interface ServiceLinePayment{
    id?:number,
    balance?:number;
    payment?:number;
    adjust?:number;
    serviceLineId?:number;
    serviceLinePaymentAction?:string,
    service?:string
    charge?:number
    unit?:number
}