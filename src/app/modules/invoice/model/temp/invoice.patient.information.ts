
import { PatientAdvancedInformation } from "src/app/modules/model/clinical/patient.advanced";
import { ReferringProvider } from "src/app/modules/model/clinical/referring.provider";
import { Address } from "src/app/modules/model/common/address"
import { AuthorizationWatching } from "src/app/modules/model/enum/authorization.watching";
import { AuthorizationInformation } from "./authorization.information";

export interface InvoicePatientInformation {
    id: number,
    firstName: string;
    lastName: string;
    dateOfBirth: number;
    gender: string;
    address: Address;
    phone: string;
    patientAdvancedInformation: PatientAdvancedInformation;
    ssn: string;
    externalId: string;
    box26: string;
    referringProvider?: ReferringProvider
    insuredPrimaryId?: string
    authorizationWatching?: boolean
    patientAuthorizationWatching?: AuthorizationWatching
}