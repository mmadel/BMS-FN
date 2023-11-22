import { Address } from "../common/address";
import { PatientCase } from "./patient.case";

export interface Patient {
    id?:number
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthDate?: string;
    maritalStatus?: string;
    gender?: string;
    address?: Address
    cases?: PatientCase[];
    phoneType?:String|null;
    phone?:string;
    email?:string
    copay?:string
}