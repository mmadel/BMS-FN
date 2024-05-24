import { RoleScope } from "src/app/modules/secuirty/model/role.scope";
import { Role } from "src/app/modules/secuirty/model/roles";

export class MatchRole {
    public static match(userRoles: RoleScope[], parent: string[], child?: string): RoleScope {
        if (parent && child)
            throw new Error('can\'t set role component and child component');
        if (parent)
            return userRoles.filter(userRole => parent.includes(userRole.role))[0];
        if (child)
            return userRoles.filter(role => {
                if (role.role === child)
                    return true
                else {
                    var parentVal: string = this.getParent(child);
                    if (role.role === parentVal)
                        return true
                    else
                        return false
                }
            })[0];
        return undefined;
    }

    private static getParent(childValue: string): string {
        let map = new Map<string, string[]>();
        let child: string[]
        let parent: string;
        child = [Role.INVOICE_BILLING_ROLE, Role.FEE_SCHEDULE_BILLING_ROLE, Role.MODIFIER_RULE_BILLING_ROLE]
        map.set(Role.BILLING_ROLE, child);
        child = [Role.REFERRING_PROVIDER_ROLE, Role.SOLID_PROVIDER_ROLE]
        map.set(Role.PROVIDER_ROLE, child);
        child = [Role.BATCH_CLIENT_PAYMENT_ROLE, Role.BATCH_INSURANCE_PAYMENT_ROLE, Role.BALANCE_STATEMENT_PAYMENT_ROLE, Role.SESSION_PAYMENT_ROLE]
        map.set(Role.PAYMENT_ROLE, child);
        child = [Role.GROUP_INFO_ADMIN_TOOL_ROLE, Role.SESSION_DEFAULT_ADMIN_TOOL_ROLE, Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE, Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE]
        map.set(Role.ADMIN_TOOL_ROLE, child);
        map.forEach((value: string[], key: string) => {
            if (value.includes(childValue))
                parent = key;
        });
        return parent;
    }

}