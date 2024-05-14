
import { MenuItem } from "../model/nav.item";
import { Role } from "../model/roles";

export class BillingRoleToItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var parentWithNoChilds: MenuItem
        var parentWithChilds: MenuItem = {
            parent: "Tools",
            children: []
        }
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.BILLING_ROLE) {
                parentWithNoChilds = {
                    parent: "Invoicing"
                }
                menuItems.push(parentWithNoChilds)
                parentWithNoChilds = {
                    parent: "Insurance"
                }
                menuItems.push(parentWithNoChilds)
                parentWithNoChilds = {
                    parent: "Tools",
                    children: ['Fee Schedule', 'Modifier Rules']
                }
                menuItems.push(parentWithNoChilds)
                return;
            }
            if (roles[i] === Role.FEE_SCHEDULE_BILLING_ROLE)
                parentWithChilds.children.push('Fee Schedule')
            if (roles[i] === Role.MODIFIER_RULE_BILLING_ROLE)
                parentWithChilds.children.push('Modifier Rules')
        }
        if (parentWithChilds.children.length !== 0)
            menuItems.push(parentWithChilds)

    }
    private static filterCriteria(str: string): boolean {
        return str.includes('billing');
    }
}