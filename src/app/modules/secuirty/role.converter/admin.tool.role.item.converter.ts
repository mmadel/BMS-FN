import { MenuItem } from "../model/nav.item";
import { Role } from "../model/roles";

export class AdminToolRoleToItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var parentWithNoChilds: MenuItem
        var parentWithChilds: MenuItem = {
            parent: "Admin Tools",
            children: []
        }
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.ADMIN_TOOL_ROLE) {
                parentWithNoChilds = {
                    parent: "Admin Tools"
                }
                menuItems.push(parentWithNoChilds)
                return;
            }
            if (roles[i] === Role.GROUP_INFO_ADMIN_TOOL_ROLE)
                parentWithChilds.children.push('Group Information')
            if (roles[i] === Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE)
                parentWithChilds.children.push('Insurances Mapping')
            if (roles[i] === Role.SESSION_DEFAULT_ADMIN_TOOL_ROLE)
                parentWithChilds.children.push('Session Defaults')
            if (roles[i] === Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE)
                parentWithChilds.children.push('Account Management')
        }
        menuItems.push(parentWithChilds)
    }
}