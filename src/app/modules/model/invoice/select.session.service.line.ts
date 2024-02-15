import { PatientSession } from "../clinical/session/patient.session";
import { ServiceCode } from "../clinical/session/service.code";

export interface SelectedSessionServiceLine{
    sessionId?:PatientSession;
    serviceLine?:ServiceCode;
}