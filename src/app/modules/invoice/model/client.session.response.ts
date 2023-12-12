import { PatientSession } from "../../model/clinical/session/patient.session";

export interface ClientSessionResponse{
    pateintId?:number,
    pateintName?:string,
    sessions?:PatientSession[]    
}