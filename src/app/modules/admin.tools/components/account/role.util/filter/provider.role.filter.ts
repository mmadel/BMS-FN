import { RoleScope } from "src/app/modules/secuirty/model/role.scope";
import { Role } from "src/app/modules/secuirty/model/roles";
import { RoleFilter } from "./role.filter";
export class ProviderRoleFilter {
    public static filter(currentList: RoleScope[], changedList: RoleScope[]) {
        if (changedList.some(roleScope => roleScope.role === Role.PROVIDER_ROLE)) {
            RoleFilter.removeRole(Role.SOLID_PROVIDER_ROLE, currentList)
            RoleFilter.removeRole(Role.REFERRING_PROVIDER_ROLE, currentList)
            RoleFilter.mergeRoles(currentList, changedList)
        }
        if (changedList.some(roleScope => roleScope.role === (Role.SOLID_PROVIDER_ROLE
            || Role.REFERRING_PROVIDER_ROLE))) {
            RoleFilter.removeRole(Role.PROVIDER_ROLE, currentList)
            RoleFilter.mergeRoles(currentList, changedList)
        }
    }
}