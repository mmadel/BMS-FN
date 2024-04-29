import { BatchServiceLineData } from "./batch.service.line.data";

export interface ServiceLinePayment{
    id?:number,
    balance?:number;
    payment?:number;
    adjust?:number;
    serviceLineId?:number;
    sessionId?:number
    serviceLinePaymentAction?:string,
    service?:string
    charge?:number
    unit?:number
    type?:string
    batchServiceLineData?:BatchServiceLineData
}