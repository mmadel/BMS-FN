import { RoleScope } from "src/app/modules/secuirty/model/role.scope";
import { Role } from "src/app/modules/secuirty/model/roles";
import { AdminToolsRoleFilter } from "./admin.tools.role.filter";
import { BillingRoleFilter } from "./billing.role.filter";
import { PaymentRoleFilter } from "./payment.role.filter";
import { ProviderRoleFilter } from "./provider.role.filter";

export class RoleFilter {
    public static filter(currentList: RoleScope[], changedList: RoleScope[]) {
        BillingRoleFilter.filter(currentList, changedList);
        ProviderRoleFilter.filter(currentList, changedList);
        PaymentRoleFilter.filter(currentList, changedList);
        AdminToolsRoleFilter.filter(currentList, changedList);
    }


    public static removeRole(role: string, roles: RoleScope[]) {
        roles.forEach((item, index) => {
            if (item.role === role) roles.splice(index, 1);
        });
    }
    public static mergeRoles(currentList: RoleScope[], changedList: RoleScope[]) {
        for (var i = 0; i < changedList.length; i++) {
            if (!currentList.some(roleScope => roleScope.role === changedList[i].role))
                currentList.push(changedList[i])
        }
    }
}