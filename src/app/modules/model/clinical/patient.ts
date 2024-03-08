import { Address } from "../common/address";
import { PatientAdvancedInformation } from "./patient.advanced";
import { PatientCase } from "./patient.case";
import { PatientInsurance } from "./patient.insurance";
import { ReferringProvider } from "./referring.provider";
import { PatientSession } from "./session/patient.session";

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
    sessions?: PatientSession[];
    referringProvider?: ReferringProvider
    patientInsurances?: PatientInsurance[]
    phoneType?: String | null;
    phone?: string;
    email?: string
    copay?: string
    ssn?: string | null
    externalId?: string | null;
    patientAdvancedInformation?: PatientAdvancedInformation
    authTurnOff?:boolean;
    authorizationDates?:Array<number[]>
}