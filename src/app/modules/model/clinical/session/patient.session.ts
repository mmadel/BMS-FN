import { CaseDiagnosis } from "../case.diagnosis"
import { ClinicInfo } from "./clinic.info";
import { DoctorInfo } from "./doctor.info";
import { PateintInfo } from "./patient.info";
import { PatientSessionHistory } from "./patient.session.history";
import { ServiceCode } from "./service.code";

export interface PatientSession {
    id?: number
    patientId?:number
    doctorInfo?: DoctorInfo;
    clinicInfo?: ClinicInfo
    serviceDate?: number;
    serviceStartTime?: number
    serviceEndTime?: number

    authorization?: string;
    placeOfCode?: string;
    caseTitle?:string
    caseDiagnosis?: CaseDiagnosis

    serviceCodes?: ServiceCode[];
    patientSessionHistory?:PatientSessionHistory[]

}