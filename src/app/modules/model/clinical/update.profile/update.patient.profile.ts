import { Patientcases } from "src/app/modules/patient/profile.edit/components/edit.patient-case/edit-patient-case.component";
import { PatientInsurances } from "src/app/modules/patient/profile.edit/components/edit.patient.insurance/edit-patient-insurance.component";
import { PatientSessions } from "src/app/modules/patient/profile.edit/components/edit.patient.session/edit-patient-session.component";

export interface UpdatePatientProfile {
    insurances: PatientInsurances[];
    cases: Patientcases[];
    sessions: PatientSessions[];
    patientId: number;
}