export interface SessionHistoryCriteria{
    insuranceCompany?:string,
    client?:string,
    provider?:string,
    claimId?:string,
    dosStart_Date?:Date,
    dosEnd_Date?:Date,
    submitStart_Date?:Date
    submitEnd_Date?:Date
    
    dosStart?:number,
    dosEnd?:number,
    submitStart?:number
    submitEnd?:number
    selectedStatus?: string[];
}