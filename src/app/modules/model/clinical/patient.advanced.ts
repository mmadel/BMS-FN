import { PateintAdvancedCondtion } from "./patient.advanced.condtion";
import { PatientAdvancedDates } from "./patient.advanced.dates";

export interface PatientAdvancedInformation {
    id?: number
    pateintAdvancedCondtion?: PateintAdvancedCondtion;
    patientAdvancedDates?: PatientAdvancedDates;
    unableToWorkStartDate_date?: Date;
    unableToWorkStartDate?: number;
    unableToWorkEndDate_date?: Date;
    unableToWorkEndDate?: number;
    hospitalizedStartDate_date?: Date;
    hospitalizedStartDate?: number;
    hospitalizedEndDate_date?: Date;
    hospitalizedEndDate?: number;
}