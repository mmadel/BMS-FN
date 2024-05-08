export class AdminToolRoleToItemConverter {
    public static convert(roles: string[], filterItems: string[]) {
        const providerFiltered = roles.filter(this.filterCriteria);
        if (providerFiltered.includes('admin-tool-role')) {
            filterItems.push('Admin Tools');
        } else {
            if (providerFiltered.includes('group-info-admin-tool-role'))
                filterItems.push('Admin Tools-Group Information');
            if (providerFiltered.includes('insurance-mapping-admin-tool-role'))
                filterItems.push('Admin Tools-Insurances Mapping');
            if (providerFiltered.includes('session-default-admin-tool-role'))
                filterItems.push('Admin Tools-Session Defaults');
            if (providerFiltered.includes('account-management-admin-tool-role'))
                filterItems.push('Admin Tools-Account Management');
        }
    }
    private static filterCriteria(str: string): boolean {
        return str.includes('admin-tool');
    }
}