import { MenuItem } from "../model/nav.item";
import { Role } from "../model/roles";

export class ClientRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var menuItem: MenuItem = undefined
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.PATIENT_ROLE)
                menuItem = {
                    parent: "Patient"
                }
        }
        if (menuItem !== undefined)
            menuItems.push(menuItem)
    }

}