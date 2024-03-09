export interface PatientAuthorization{
    id?:number
    authNumber?:string
    insCompany?:string[],
    serviceCode?:string,
    startDate?:Date
    expireDate?:Date
    startDateNumber?:number
    expireDateNumber?:number
    visit?:number
    remaining?:number
    patientId?:number
    isExpired?:boolean
    selected?:boolean
}