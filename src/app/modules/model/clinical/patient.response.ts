import { Patient } from "./patient"

export interface PatientResponse{
    name?:string
    dob?:Date
    email?:string
    data?:Patient
}