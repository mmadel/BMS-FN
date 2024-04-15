import { ClientBalance } from "./client.balance";
import { ClientBalanceAccount } from "./client.balance.account";

export interface ClientBalanceStatement{
    clientBalanceAccounts?:ClientBalanceAccount
    clientBalancePayments?:ClientBalance[]
}