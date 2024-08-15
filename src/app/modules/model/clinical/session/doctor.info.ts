import { LegacyID } from "../provider/legacy.id"

export interface DoctorInfo {
    doctorId?: number
    doctorFirstName?: string
    doctorLastName?: string
    doctorNPI?: string
    legacyID?:LegacyID,
    taxonomy?:string
}