import { Address } from "../common/address";
import { PatientCase } from "./patient.case";
import { PatientInsurance } from "./patient.insurance";
import { ReferringProvider } from "./referring.provider";

export interface Patient {
    id?: number
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthDate?: number;
    maritalStatus?: string;
    gender?: string;
    address?: Address
    cases?: PatientCase[];
    referringProvider?: ReferringProvider
    patientInsurances?: PatientInsurance[]
    phoneType?: String | null;
    phone?: string;
    email?: string
    copay?: string
}