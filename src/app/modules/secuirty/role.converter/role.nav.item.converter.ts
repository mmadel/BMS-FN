
import { INavData } from "@coreui/angular-pro";
import { navItems } from "src/app/core/layout/_nav";
import { AdminToolRoleToItemConverter } from "./admin.tool.role.item.converter";
import { BillingRoleToItemConverter } from "./billing.role.item.converter";
import { ClientRoleItemConverter } from "./client.role.item.converter";
import { FilingRoleItemConverter } from "./filing.role.item.converter";
import { PaymentRoleItemConverter } from "./payment.role.item.converter";
import { ProviderRoleItemConverter } from "./provider.role.item.converter";

export class RoleNavItemConverter {
    public static convert(roles: string[]): string[] {
        var returnedNavItems: string[] = [];
        if (roles.some(str => str.includes('patient-role')))
            ClientRoleItemConverter.convert(roles, returnedNavItems)
        if (roles.some(str => str.includes('provider-role')))
            ProviderRoleItemConverter.convert(roles, returnedNavItems)
        if (roles.some(str => str.includes('billing-role')))
            BillingRoleToItemConverter.convert(roles, returnedNavItems)
        if (roles.some(str => str.includes('filing-role')))
            FilingRoleItemConverter.convert(roles, returnedNavItems)
        if (roles.some(str => str.includes('payment-role')))
            PaymentRoleItemConverter.convert(roles, returnedNavItems)
        if (roles.some(str => str.includes('admin-tool-role')))
            AdminToolRoleToItemConverter.convert(roles, returnedNavItems)
        return returnedNavItems
    }
}