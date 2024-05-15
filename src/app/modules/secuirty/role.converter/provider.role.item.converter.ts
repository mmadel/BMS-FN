import { MenuItem } from "../model/nav.item";
import { Role } from "../model/roles";

export class ProviderRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var parentWithNoChilds: MenuItem
        var parentWithChilds: MenuItem = {
            parent: "Providers",
            children: []
        }
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.PROVIDER_ROLE) {
                parentWithNoChilds = {
                    parent: "Providers"
                }
                menuItems.push(parentWithNoChilds)
                return;
            }
            if (roles[i] === Role.SOLID_PROVIDER_ROLE)
                parentWithChilds.children.push('Provider List')
            if (roles[i] === Role.REFERRING_PROVIDER_ROLE)
                parentWithChilds.children.push('Referring Provider List')
        }
        if (parentWithChilds.children.length !== 0)
            menuItems.push(parentWithChilds)
    }
}