import { RoleScope } from "src/app/modules/secuirty/model/role.scope";
import { Scope } from "src/app/modules/secuirty/model/scope";

export class RoleScopeCreator {
    public static create(elementId: string, scopeIds: string[], roleScopes: RoleScope[], role: string): RoleScope[] {
        console.log(elementId + ' ' + scopeIds)
        //Hidden
        if (elementId === scopeIds[0]) {
            roleScopes = [];
        }
        //View Only
        if (elementId === scopeIds[1]) {
            console.log('View Only')
            var roleScope: RoleScope = {
                role: role
            }
            roleScope.scope = Scope.VIEWSCOPE
            roleScopes = this.removeFromRoleScopesByScope(roleScopes, Scope.MODIFYSCOPE);
            roleScopes.push(roleScope)
        }
        if (elementId === scopeIds[2]) {
            var roleScope: RoleScope = {
                role: role
            }
            roleScope.scope = Scope.MODIFYSCOPE
            roleScopes = this.removeFromRoleScopesByScope(roleScopes, Scope.VIEWSCOPE);
            roleScopes.push(roleScope)
        }
        return roleScopes;
    }
    private static removeFromRoleScopesByScope(list: RoleScope[], scope: string) {
        return list.filter((roleScope) => roleScope.scope !== scope);
    }
}