import { Address } from "../common/address";
import { PatientInsuranceAdvanced } from "./patient.insurance.advanced";
import { PatientInsurancePolicy } from "./patient.insurance.policy";
import { PatientRelation } from "./patient.relation";

export interface PatientInsurance {
    id?:number,
    relation?: string
    patientRelation?: PatientRelation;
    patientInsurancePolicy?: PatientInsurancePolicy
    patientInsuranceAdvanced?: PatientInsuranceAdvanced
    payerAddress?: Address
    isArchived?:boolean
    insuranceCompany?:number;

}