import { PatientSession } from "./patient.session"

export interface PatientSessionResponse{
    id?:number
    dateOfService?:Date
    doctorName?:string
    data:PatientSession
}