import { MenuItem } from "../model/nav.item";

export class FilingRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var menuItem: MenuItem
        menuItem = {
            parent: "CMS Filing"
        }
        menuItems.push(menuItem)
    }
}