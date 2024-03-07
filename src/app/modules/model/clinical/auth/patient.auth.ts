export interface PatientAuthorization{
    authNumber?:string
    insCompany?:string[],
    serviceCode?:string,
    startDate?:Date
    expireDate?:Date
    startDateNumber?:number
    expireDateNumber?:number
}