import { MenuItem } from "../model/nav.item";

export class ClientRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var menuItem: MenuItem
        menuItem = {
            parent: "Patient"
        }
        menuItems.push(menuItem)
    }

}