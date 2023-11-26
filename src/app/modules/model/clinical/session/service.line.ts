import { ServiceLineType } from "../../enum/session/service.line.type";
import { CaseDiagnosis } from "../case.diagnosis";
import { CPTCode } from "../cpt.code";

export interface ServiceLine {
    caseDiagnosis: CaseDiagnosis[]
    cptCodes: CPTCode
    type: ServiceLineType
}