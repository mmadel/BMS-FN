import { Role } from "../model/roles";

export class ProviderRoleItemConverter {
    public static convert(roles: string[], filterItems: string[]) {
        const providerFiltered = roles.filter(this.filterCriteria);
        if (providerFiltered.includes(Role.PROVIDER_ROLE)) {
            filterItems.push('Providers');
        } else {
            if (providerFiltered.includes('referring-provider-role'))
                filterItems.push('Providers-Provider List');
            if (providerFiltered.includes(Role.MODIFIER_RULE_BILLING_ROLE))
                filterItems.push('Providers-Modifier Rules');
        }
    }
    private static filterCriteria(str: string): boolean {
        return str.includes('provider');
    }
}