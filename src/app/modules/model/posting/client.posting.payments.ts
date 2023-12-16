import { PaymentServiceLine } from "./payment.service.line"

export interface ClientPostingPayments{
    clientId:number
    paymentServiceLines:PaymentServiceLine[]
}
