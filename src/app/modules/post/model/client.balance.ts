import { PatientSession } from "../../model/clinical/session/patient.session";

export interface ClientBalance {
    dos?:number;
    serviceCode?:string,
    provider?:string,
    charge?:number,
    insCompanyPayment?:number,
    clientPayment?:number,
    adjustPayment?:number,
    balance?:number,
    placeOfCode?:string;
    units?:number
    patientSession?:PatientSession
}