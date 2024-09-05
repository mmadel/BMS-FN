export interface ERADetailsLine{
    billAmount:number;
    allowedAmount:number;
    adjustAmount:number;
    deductAmount:number;
    coInsuranceAmount:number;
    coPaymentAmount:number;
    paidAmount:number;
    reasons:string[];
    cptCode:number;
    units:number;
    dos:string;
    claimId:string
    chargeLineId:string
}