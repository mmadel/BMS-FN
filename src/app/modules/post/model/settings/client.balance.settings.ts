import { ClientBalanceAccountSettings } from "./client.balance.account.settings"
import { CLientBalanceBillingProviderSettings } from "./client.balance.billing.provider.settings"

export interface ClientBalanceSettings{
    patientBalanceBillingProviderSettings?:CLientBalanceBillingProviderSettings
    patientBalanceAccountSettings?:ClientBalanceAccountSettings
}