import { Payer } from "../admin/payer";
import { BasicAddress } from "../common/basic.address";
import { PatientInsuranceAdvanced } from "./patient.insurance.advanced";
import { PatientInsurancePolicy } from "./patient.insurance.policy";
import { PatientRelation } from "./patient.relation";

export interface PatientInsurance {
    id?:number,
    relation?: string
    patientRelation?: PatientRelation;
    patientInsurancePolicy?: PatientInsurancePolicy
    patientInsuranceAdvanced?: PatientInsuranceAdvanced
    isArchived?:boolean
    payer?:Payer

}