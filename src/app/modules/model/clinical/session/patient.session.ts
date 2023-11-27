import { CaseDiagnosis } from "../case.diagnosis"
import { DoctorInfo } from "./doctor.info";
import { PateintInfo } from "./patient.info";
import { ServiceLine } from "./service.line"

export interface PatientSession {
    id?: number
    patientInfo: PateintInfo;
    doctorInfo?: DoctorInfo;
    serviceDate?: number;
    serviceStartTime?: number
    serviceEndTime?: number

    authorization: string;
    placeOfCode: string;

    caseDiagnosis: CaseDiagnosis[]

    serviceLines?: ServiceLine[];

}