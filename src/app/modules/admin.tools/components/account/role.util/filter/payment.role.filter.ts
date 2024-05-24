import { RoleScope } from "src/app/modules/secuirty/model/role.scope";
import { Role } from "src/app/modules/secuirty/model/roles";
import { RoleFilter } from "./role.filter";
export class PaymentRoleFilter {
    public static filter(currentList: RoleScope[], changedList: RoleScope[]) {
        if (changedList.some(roleScope => roleScope.role === Role.PAYMENT_ROLE)) {
            RoleFilter.removeRole(Role.BATCH_INSURANCE_PAYMENT_ROLE, currentList)
            RoleFilter.removeRole(Role.BATCH_CLIENT_PAYMENT_ROLE, currentList)
            RoleFilter.removeRole(Role.BALANCE_STATEMENT_PAYMENT_ROLE, currentList)
            RoleFilter.removeRole(Role.SESSION_PAYMENT_ROLE, currentList)
            RoleFilter.mergeRoles(currentList, changedList)
        }
        if (changedList.some(roleScope => roleScope.role === (Role.BATCH_INSURANCE_PAYMENT_ROLE
            || Role.BATCH_CLIENT_PAYMENT_ROLE
            || Role.BALANCE_STATEMENT_PAYMENT_ROLE
            || Role.SESSION_PAYMENT_ROLE))) {
            RoleFilter.removeRole(Role.PAYMENT_ROLE, currentList)
            RoleFilter.mergeRoles(currentList, changedList)
        }
    }
}