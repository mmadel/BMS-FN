export class BillingRoleToItemConverter {
    public static convert(roles: string[], filterItems: string[]) {
        const billingFiltered = roles.filter(this.filterCriteria);
        if (billingFiltered.includes('billing-role')) {
            filterItems.push('Invoicing');
            filterItems.push('Insurance');
            filterItems.push('Tools-Fee Schedule,Modifier Rules');
        } else {
            if (billingFiltered.includes('fee-schedule-billing-role'))
                filterItems.push('Tools-Fee Schedule');
            if (billingFiltered.includes('modifier-rule-billing-role'))
                filterItems.push('Tools-Modifier Rules');
        }
    }
    private static filterCriteria(str: string): boolean {
        return str.includes('billing');
    }
}