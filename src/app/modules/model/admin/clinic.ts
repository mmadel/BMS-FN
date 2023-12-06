import { ClinicData } from "./clinic.data";

export interface Clinic {
    id?: number,
    title?: string,
    clinicdata?:ClinicData;
}