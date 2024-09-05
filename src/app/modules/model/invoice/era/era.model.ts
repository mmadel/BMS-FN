import { ERADetails } from "./era.details"

export interface ERAModel{
    checkNumber:string,
    payerName:number,
    receivedDate:string,
    seen:boolean
    paidAmount:number,
    eraId:number
    lines:number
    unAppliedLines:number
    checkType:string
    eraDetails:ERADetails
}