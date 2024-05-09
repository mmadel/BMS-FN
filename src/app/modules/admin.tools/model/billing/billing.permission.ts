import { BillingSubPermission } from "./billing.sub.permission"

export interface BillingPermission {
    isHidden: boolean
    isViewOnly: boolean
    isModify: boolean

    billingSubPermission: BillingSubPermission
}