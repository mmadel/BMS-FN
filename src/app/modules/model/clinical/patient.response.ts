import { Patient } from "./patient"

export interface PatientResponse{
    id?:number
    name?:string
    dob?:Date
    email?:string
    data?:Patient
    status:boolean
}