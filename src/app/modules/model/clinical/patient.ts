import { Address } from "../common/address";
import { PatientCase } from "./patient.case";

export interface Patient {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthDate: number;
    maritalStatus?: string;
    gender?: string;
    addresses?: Address
    cases?: PatientCase[];
}