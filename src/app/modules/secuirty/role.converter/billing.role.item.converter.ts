import { Role } from "../model/roles";

export class BillingRoleToItemConverter {
    public static convert(roles: string[], filterItems: string[]) {
        const billingFiltered = roles.filter(this.filterCriteria);
        if (billingFiltered.includes(Role.BILLING_ROLE)) {
            filterItems.push('Invoicing');
            filterItems.push('Insurance');
            filterItems.push('Tools-Fee Schedule,Modifier Rules');
        } else {
            if (billingFiltered.includes(Role.FEE_SCHEDULE_BILLING_ROLE))
                filterItems.push('Tools-Fee Schedule');
            if (billingFiltered.includes(Role.MODIFIER_RULE_BILLING_ROLE))
                filterItems.push('Tools-Modifier Rules');
        }
    }
    private static filterCriteria(str: string): boolean {
        return str.includes('billing');
    }
}