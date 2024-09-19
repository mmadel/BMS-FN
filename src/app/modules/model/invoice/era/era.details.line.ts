export interface ERADetailsLine{
    billAmount:number;
    allowedAmount:number;
    adjustAmount:number;
    editAdjustAmount:number;
    deductAmount:number;
    coInsuranceAmount:number;
    coPaymentAmount:number;
    paidAmount:number;
    editPaidAmount:number
    reasons:string[];
    cptCode:number;
    units:number;
    dos:string;
    claimId:string
    serviceLineID:string
    serviceLinePaymentAction:string
    action:string
    selected:boolean
    touched:boolean
    claimStatusCode:string;
    claimStatusDescription:string;
    
}