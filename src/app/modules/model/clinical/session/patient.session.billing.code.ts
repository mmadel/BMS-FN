import { CaseDiagnosis } from "../case.diagnosis";
import { CPTCode } from "../cpt.code";

export interface PatientSessionBillingCode {
    authorization: string;
    placeOfCode: string;
    caseDiagnosis: CaseDiagnosis
    cptCodes: CPTCode[]
}