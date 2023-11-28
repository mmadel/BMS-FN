import { CaseDiagnosis } from "../case.diagnosis"
import { ClinicInfo } from "./clinic.info";
import { DoctorInfo } from "./doctor.info";
import { PateintInfo } from "./patient.info";
import { ServiceLine } from "./service.line"

export interface PatientSession {
    id?: number
    patientInfo: PateintInfo;
    doctorInfo?: DoctorInfo;
    ClinicInfo?: ClinicInfo
    serviceDate?: number;
    serviceStartTime?: number
    serviceEndTime?: number

    authorization: string;
    placeOfCode: string;

    caseDiagnosis: CaseDiagnosis[]

    serviceLines?: ServiceLine[];

}