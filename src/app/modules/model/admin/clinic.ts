import { ClinicData } from "./clinic.data";

export interface Clinic {
    id?: number,
    title?: string,
    npi?: string
    clinicdata?: ClinicData;
}