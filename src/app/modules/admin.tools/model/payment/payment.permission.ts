import { PaymentSubPermission } from "./payment.sub.permission"

export interface PaymentPermission {
    isHidden?: boolean
    isViewOnly?: boolean
    isModify?: boolean

    paymentSubPermission?: PaymentSubPermission
}