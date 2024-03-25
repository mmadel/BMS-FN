export interface SessionHistoryCriteria{
    insuranceCompany?:string,
    client?:string,
    provider?:string,
    claimId?:string,
    dosStart?:Date,
    dosEnd?:Date,
    submitStart?:Date
    submitEnd?:Date
}