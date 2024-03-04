import { Patient } from "../../model/clinical/patient";
import { PatientSession } from "../../model/clinical/session/patient.session";

export interface ClientSessionResponse{
    sessions?:PatientSession[] 
    client?:Patient,
    isFiltered?:boolean
}