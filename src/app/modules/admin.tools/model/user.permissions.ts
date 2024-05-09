import { AdminPermission } from "./admin/admin.permission";
import { BillingPermission } from "./billing/billing.permission";
import { ClientPermission } from "./client/client.permission";
import { FilingPermission } from "./filing/filing.permission";
import { PaymentPermission } from "./payment/payment.permission";
import { ProviderPermission } from "./provider/provider.permission";

export interface UserPermissions {
    billingPermissions?: BillingPermission
    providerPermissions?: ProviderPermission
    clientPermissions?: ClientPermission
    paymentPermissions?: PaymentPermission;
    filingPermisiions?: FilingPermission
    adminPermissions?: AdminPermission

}