import { RoleScope } from "src/app/modules/secuirty/model/role.scope";

export class MatchRole {
    public static match(userRoles: RoleScope[], parent: string[], child?: string): RoleScope {
        if (parent && child)
            throw new Error('can\'t set role component and child component');
        if (parent)
            return userRoles.filter(userRole => parent.includes(userRole.role))[0];
        if (child)
            return userRoles.filter(role => role.role === child)[0];
        return undefined;
    }
}