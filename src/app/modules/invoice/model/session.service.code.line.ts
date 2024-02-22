import { PatientSession } from "../../model/clinical/session/patient.session"
import { ServiceCode } from "../../model/clinical/session/service.code"

export interface SessionServiceCodeLine {
    dos?: string,
    provider?: string,
    case?: string,
    place?: string,
    cpt?: string,
    unit?: number,
    charge?: number
    data?:PatientSession
    cptId?:number
    serviceCode:ServiceCode
    isCorrect?:boolean
}