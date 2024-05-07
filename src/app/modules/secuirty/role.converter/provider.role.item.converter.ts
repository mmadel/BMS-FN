export class ProviderRoleItemConverter {
    public static convert(roles: string[], filterItems: string[]) {
        const providerFiltered = roles.filter(this.filterCriteria);
        if (providerFiltered.includes('provider-role')) {
            filterItems.push('Providers');
        } else {
            if (providerFiltered.includes('referring-provider-role'))
                filterItems.push('Providers-Provider List');
            if (providerFiltered.includes('modifier-rule-billing-role'))
                filterItems.push('Providers-Modifier Rules');
        }
    }
    private static filterCriteria(str: string): boolean {
        return str.includes('provider');
    }
}