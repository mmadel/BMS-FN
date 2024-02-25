import { Address } from "../../common/address"
import { LegacyID } from "./legacy.id"
import { ProviderInfo } from "./provider.info"

export interface Provider {
    id?: number
    firstName?: string
    lastName?: string
    email?: string
    npi?: string
    phone?: string
    address?: Address
    providerInfo?: ProviderInfo
    legacyID?:LegacyID
}