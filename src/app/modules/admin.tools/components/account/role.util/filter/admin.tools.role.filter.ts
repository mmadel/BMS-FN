import { RoleScope } from "src/app/modules/secuirty/model/role.scope";
import { Role } from "src/app/modules/secuirty/model/roles";
import { RoleFilter } from "./role.filter";

export class AdminToolsRoleFilter {
    public static filter(currentList: RoleScope[], changedList: RoleScope[]) {
        if (changedList.some(roleScope => roleScope.role === Role.ADMIN_TOOL_ROLE)) {
            RoleFilter.removeRole(Role.GROUP_INFO_ADMIN_TOOL_ROLE, currentList)
            RoleFilter.removeRole(Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE, currentList)
            RoleFilter.removeRole(Role.SESSION_DEFAULT_ADMIN_TOOL_ROLE, currentList)
            RoleFilter.removeRole(Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE, currentList)
            RoleFilter.mergeRoles(currentList, changedList)
        }
        if (changedList.some(roleScope => roleScope.role === (Role.GROUP_INFO_ADMIN_TOOL_ROLE
            || Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE
            || Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE))) {
            RoleFilter.removeRole(Role.ADMIN_TOOL_ROLE, currentList)
            RoleFilter.mergeRoles(currentList, changedList)
        }
    }
}