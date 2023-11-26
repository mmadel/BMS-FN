import { PatientHistorySession } from "./patient.history.session"
import { PatientSessionBillingCode } from "./patient.session.billing.code"

export interface PatientSession {
    id?: number

    patientId?: number
    patientFirstName?: string
    patientMiddleName?: string
    patientLasttName: string

    doctorId?: number
    doctorFirstName?: string
    doctorLastName?: string
    doctorNPI?: string

    serviceDate?: Date;
    serviceStartTime?: Date
    serviceEndTime?: Date

    patientSessionBillingCode?: PatientSessionBillingCode;

    patientHistorySession?: PatientHistorySession[];


}