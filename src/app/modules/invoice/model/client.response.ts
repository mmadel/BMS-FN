import { Patient } from "../../model/clinical/patient";

export interface ClientResponse {
    clientId?: number,
    clientName?: string,
    primaryInsurance: string,
    secondaryInsurance?: string;
    data?: Patient
}