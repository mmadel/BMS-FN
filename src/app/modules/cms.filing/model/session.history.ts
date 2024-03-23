import { SessionHistoryCount } from "./session.history.count"

export interface SessionHistory {
    submissionId?: number
    insuranceCompany?: string
    submitDate?: number
    client?: string
    provider?: string
    submissionType?:string
    submissionStatus?:string
    sessionCounts?:SessionHistoryCount[]
}