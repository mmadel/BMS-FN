import { Patient } from "../../model/clinical/patient";
import { PatientSession } from "../../model/clinical/session/patient.session";

export interface ClientResponse {
    clientId?: number,
    clientName?: string,
    primaryInsurance: string,
    secondaryInsurance?: string;
    sessions?:PatientSession[];
}