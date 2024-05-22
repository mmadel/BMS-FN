import { RoleScope } from "src/app/modules/secuirty/model/role.scope";
import { Role } from "src/app/modules/secuirty/model/roles";
import { RoleFilter } from "./role.filter";
export class BillingRoleFilter {
    public static filter(currentList: RoleScope[], changedList: RoleScope[]) {
        if (changedList.some(roleScope => roleScope.role === Role.BILLING_ROLE)) {
            RoleFilter.removeRole(Role.INVOICE_BILLING_ROLE, currentList)
            RoleFilter.removeRole(Role.FEE_SCHEDULE_BILLING_ROLE, currentList)
            RoleFilter.removeRole(Role.MODIFIER_RULE_BILLING_ROLE, currentList)
            RoleFilter.mergeRoles(currentList, changedList)
        }
        if (changedList.some(roleScope => roleScope.role === (Role.INVOICE_BILLING_ROLE
            || Role.FEE_SCHEDULE_BILLING_ROLE
            || Role.MODIFIER_RULE_BILLING_ROLE))) {
            RoleFilter.removeRole(Role.BILLING_ROLE, currentList)
            RoleFilter.mergeRoles(currentList, changedList)
        }

    }
}