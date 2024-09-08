export interface ERADetailsLine{
    billAmount:number;
    allowedAmount:number;
    adjustAmount:number;
    editadjustAmount:number;
    deductAmount:number;
    coInsuranceAmount:number;
    coPaymentAmount:number;
    paidAmount:number;
    editpaidAmount:number
    reasons:string[];
    cptCode:number;
    units:number;
    dos:string;
    claimId:string
    chargeLineId:string
    serviceLinePaymentAction:string
}