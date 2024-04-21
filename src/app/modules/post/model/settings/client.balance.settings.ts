import { ClientBalanceAccountSettings } from "./client.balance.account.settings"
import { CLientBalanceBillingProviderSettings } from "./client.balance.billing.provider.settings"

export interface ClientBalanceSettings{
    id?:number
    patientBalanceBillingProviderSettings?:CLientBalanceBillingProviderSettings
    patientBalanceAccountSettings?:ClientBalanceAccountSettings
}