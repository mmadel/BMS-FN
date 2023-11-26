import { CaseDiagnosis } from "../case.diagnosis"
import { ServiceLine } from "./service.line"

export interface PatientSession {
    id?: number

    patientId?: number
    patientFirstName?: string
    patientMiddleName?: string
    patientLasttName: string

    doctorId?: number
    doctorFirstName?: string
    doctorLastName?: string
    doctorNPI?: string

    serviceDate?: Date;
    serviceStartTime?: Date
    serviceEndTime?: Date

    authorization: string;
    placeOfCode: string;

    caseDiagnosis: CaseDiagnosis[]

    serviceLines?: ServiceLine[];

}