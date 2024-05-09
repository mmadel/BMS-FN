import { ProviderReferringPermission } from "./provider.referring.provider"
import { ProviderSolidPermission } from "./provider.solid.permission"

export interface ProviderSubPermission {
    providerSolidPermission?:ProviderSolidPermission
    providerReferringPermission?:ProviderReferringPermission
}