import { ClientBalance } from "./client.balance"

export interface ClientBalanceInvoice {
    providerName?: string
    providerAddress?: string
    invoiceDate?: number
    invoiceNumber?: string

    clientName?:string
    clientAddress?:string
    clinicName?:string

    finalizedClientBalance?:ClientBalance[]
    pendingClientBalance?:ClientBalance[]
}