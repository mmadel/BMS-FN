import { PaymentBatch } from "./batch.paymnet"

export interface PaymentServiceLine {
    sessionId?: number
    serviceLineId?: number
    dateOfService?: number
    cpt?: string
    provider?: string
    billedValue?: number
    previousPayments?: number
    payment?: number
    prevPayment?: number
    adjust?: number
    prevAdjust?: number
    balance?: number
    serviceLinePaymentAction?: string
    paymentBatch?:PaymentBatch
}