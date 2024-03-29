import { ServiceLineType } from "../../enum/session/service.line.type";
import { CaseDiagnosis } from "../case.diagnosis";
import { CPTCode } from "../cpt.code";

export interface ServiceCode {
    id?:number
    diagnoses?: string[]
    cptCode?: CPTCode
    type?: ServiceLineType
}