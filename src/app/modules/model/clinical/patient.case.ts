import { CaseDiagnosis } from "./case.diagnosis";

export interface PatientCase{
    id?:number;
    title?:string;
    caseDiagnosis?:CaseDiagnosis[]
}