import { PatientSession } from "../../model/clinical/session/patient.session"

export interface SessionServiceCodeLine {
    dos?: string,
    provider?: string,
    case?: string,
    place?: string,
    cpt?: string,
    unit?: number,
    charge?: number
    data?:PatientSession
}