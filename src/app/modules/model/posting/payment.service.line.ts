export interface PaymentServiceLine {
    sessionId?: number
    serviceCodeId?: number
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
    sessionAction?: string
}