import { ClientBalance } from "./client.balance"
import { ClientBalanceAccount } from "./client.balance.account"

export interface ClientBalanceInvoice {
   
    clientBalanceAccounts?:ClientBalanceAccount[]
    finalizedClientBalance?:ClientBalance[]
    pendingClientBalance?:ClientBalance[]
}