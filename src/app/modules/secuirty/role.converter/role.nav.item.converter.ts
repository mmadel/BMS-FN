
import { INavData } from "@coreui/angular-pro";
import { navItems } from "src/app/core/layout/_nav";
import { Role } from "../model/roles";
import { AdminToolRoleToItemConverter } from "./admin.tool.role.item.converter";
import { BillingRoleToItemConverter } from "./billing.role.item.converter";
import { ClientRoleItemConverter } from "./client.role.item.converter";
import { FilingRoleItemConverter } from "./filing.role.item.converter";
import { PaymentRoleItemConverter } from "./payment.role.item.converter";
import { ProviderRoleItemConverter } from "./provider.role.item.converter";

export class RoleNavItemConverter {
    public static convert(roles: string[]): string[] {
        var returnedNavItems: string[] = [];
        if (roles.some(str => str.includes(Role.PATIENT_ROLE)))
            ClientRoleItemConverter.convert(roles, returnedNavItems)
        if (roles.some(str => str.includes(Role.PROVIDER_ROLE)))
            ProviderRoleItemConverter.convert(roles, returnedNavItems)
        if (roles.some(str => str.includes(Role.BILLING_ROLE)))
            BillingRoleToItemConverter.convert(roles, returnedNavItems)
        if (roles.some(str => str.includes(Role.FILING_ROLE)))
            FilingRoleItemConverter.convert(roles, returnedNavItems)
        if (roles.some(str => str.includes(Role.PAYMENT_ROLE)))
            PaymentRoleItemConverter.convert(roles, returnedNavItems)
        if (roles.some(str => str.includes(Role.ADMIN_TOOL_ROLE)))
            AdminToolRoleToItemConverter.convert(roles, returnedNavItems)
        return returnedNavItems
    }
}