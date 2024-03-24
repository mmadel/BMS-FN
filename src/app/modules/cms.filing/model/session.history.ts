import { Patient } from "../../model/clinical/patient"
import { SessionHistoryCount } from "./session.history.count"

export interface SessionHistory {
    submissionId?: number
    insuranceCompany?: string
    submitDate?: number
    client?: Patient
    provider?: string
    submissionType?:string
    submissionStatus?:string
    sessionCounts?:SessionHistoryCount[]
}