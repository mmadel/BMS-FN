import { CaseDiagnosis } from "src/app/modules/model/clinical/case.diagnosis";
import { CPTCode } from "src/app/modules/model/clinical/cpt.code";
import { ServiceLine } from "src/app/modules/model/clinical/session/service.line";

export interface BillingCode {
    placeOfCode?: string;
    facility?: string;
    diagnosisCode?: CaseDiagnosis;
    ServiceLines?: ServiceLine[]
}