import { BillingFeeSchedulePermission } from "./billing.fee.sechdule.permission";
import { BillingInvoicePermission } from "./billing.invoice.permissions";
import { BillingModifierRulePermission } from "./billing.modifier.rule.permission";

export interface BillingSubPermission {
    billingInvoicePermission: BillingInvoicePermission
    billingFeeSchedulePermission: BillingFeeSchedulePermission
    billingModifierRulePermission: BillingModifierRulePermission
}