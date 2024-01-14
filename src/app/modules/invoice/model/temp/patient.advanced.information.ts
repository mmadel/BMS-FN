import { PatientAdvancedCondition } from "./patient.advanced.condition";
import { PatientAdvancedDates } from "./patient.advanced.dates";

export interface PatientAdvancedInformation{
    pateintAdvancedCondtion: PatientAdvancedCondition;
     patientAdvancedDates: PatientAdvancedDates;
     unableToWorkStartDate: number;
     unableToWorkEndDate: number;
     hospitalizedStartDate: number;
     hospitalizedEndDate: number;
}