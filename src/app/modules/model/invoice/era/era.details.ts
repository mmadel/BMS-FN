import { ERADetailsLine } from "./era.details.line";

export interface ERADetails{
    totalPaidAmount:number;
    paymentMethod:number;
    lines:ERADetailsLine[]
}