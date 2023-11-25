import { PateintAdvancedCondtion } from "./patient.advanced.condtion";
import { PatientAdvancedDates } from "./patient.advanced.dates";

export interface PatientAdvancedInformation {
    id?: number
    pateintAdvancedCondtion?: PateintAdvancedCondtion;
    patientAdvancedDates?: PatientAdvancedDates;
    unableToWorkStartDate?: Date;
    unableToWorkEndDate?: Date;
    hospitalizedStartDate?: Date;
    hospitalizedEndDate?: Date;
}