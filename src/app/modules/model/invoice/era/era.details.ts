import { ERADetailsLine } from "./era.details.line";

export interface ERADetails{
    totalPaidAmount:number;
    paymentMethod:number;
    checkNumber:string;
    eraDate:string;
    totalPaid:number;
    chekType:string;
    payerName:string
    eraId:number
    lines:ERADetailsLine[]
}