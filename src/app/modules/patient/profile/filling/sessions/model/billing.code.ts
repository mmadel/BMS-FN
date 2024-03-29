import { Clinic } from "src/app/modules/model/admin/clinic";
import { CaseDiagnosis } from "src/app/modules/model/clinical/case.diagnosis";
import { CPTCode } from "src/app/modules/model/clinical/cpt.code";
import { ServiceCode } from "src/app/modules/model/clinical/session/service.code";

export interface BillingCode {
    placeOfCode?: string;
    facility?: Clinic;
    caseTitle?:string
    diagnosisCode?: CaseDiagnosis[];
    ServiceCodes?: ServiceCode[]
    isCaseAttached?:boolean;
}