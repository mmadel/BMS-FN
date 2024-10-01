import { Address } from "../common/address";

export interface PatientRelation {
    r_firstName?: string;
    r_middleName?: string;
    r_lastName?: string;
    r_birthDate?: number;
    dob?: Date
    r_gender?: string;
    r_genderIdentity?:string
    r_address?: Address
    r_phone?: string;
}