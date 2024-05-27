import { MenuItem } from "../model/nav.item";
import { Role } from "../model/roles";

export class FilingRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var menuItem: MenuItem = undefined
        var menuItem: MenuItem = undefined
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.FILING_ROLE)
                menuItem = {
                    parent: "CMS Filing"
                }
        }
        if (menuItem !== undefined)
            menuItems.push(menuItem)
    }
}