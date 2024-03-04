import { PatientSession } from "../../model/clinical/session/patient.session";

export interface ClientResponse {
    clientId?: number,
    clientName?: string,
    sessions?: PatientSession[];
}