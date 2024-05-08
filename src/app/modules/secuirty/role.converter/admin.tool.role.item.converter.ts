import { Role } from "../model/roles";

export class AdminToolRoleToItemConverter {
    public static convert(roles: string[], filterItems: string[]) {
        const providerFiltered = roles.filter(this.filterCriteria);
        if (providerFiltered.includes(Role.ADMIN_TOOL_ROLE)) {
            filterItems.push('Admin Tools');
        } else {
            if (providerFiltered.includes(Role.GROUP_INFO_ADMIN_TOOL_ROLE))
                filterItems.push('Admin Tools-Group Information');
            if (providerFiltered.includes(Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE))
                filterItems.push('Admin Tools-Insurances Mapping');
            if (providerFiltered.includes(Role.SESSION_DEFAULT_ADMIN_TOOL_ROLE))
                filterItems.push('Admin Tools-Session Defaults');
            if (providerFiltered.includes(Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE))
                filterItems.push('Admin Tools-Account Management');
        }
    }
    private static filterCriteria(str: string): boolean {
        return str.includes('admin-tool');
    }
}