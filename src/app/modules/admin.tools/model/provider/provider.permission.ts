import { ProviderSubPermission } from "./provider.sub.permissions"

export interface ProviderPermission{
    isHidden?:boolean
    isViewOnly?:boolean
    isModify?:boolean

    providerSubPermission?:ProviderSubPermission
}