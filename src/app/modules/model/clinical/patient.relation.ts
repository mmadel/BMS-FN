import { Address } from "../common/address";

export interface PatientRelation{
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthDate?: number;
    gender?: string;
    address?: Address
    phone?:string;
}