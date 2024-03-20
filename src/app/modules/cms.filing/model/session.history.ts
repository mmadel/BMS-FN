export interface SessionHistory {
    submissionId?: number
    insuranceCompany?: string
    submitDate?: Date
    client?: string
    provider?: string
    dateOfService: Date
    submissionType?:string;
    claimStatus?:string
}