import { BatchServiceLineData } from "./batch.service.line.data";

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
    batchServiceLineData?:BatchServiceLineData
}