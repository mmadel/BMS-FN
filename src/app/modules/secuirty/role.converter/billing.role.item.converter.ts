
import { MenuItem } from "../model/nav.item";
import { Role } from "../model/roles";

export class BillingRoleToItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var parentWithNoChilds: MenuItem
        var toolesParentWithChilds: MenuItem = {
            parent: "Tools",
            children: []
        }
        var insuranceParentWithChilds: MenuItem = {
            parent: "Invoicing",
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
            if (roles[i] === Role.INVOICE_BILLING_ROLE) {

                insuranceParentWithChilds.children.push('Invoicing Area')
            }

            if (roles[i] === Role.FEE_SCHEDULE_BILLING_ROLE)
                toolesParentWithChilds.children.push('Fee Schedule')
            if (roles[i] === Role.MODIFIER_RULE_BILLING_ROLE)
                toolesParentWithChilds.children.push('Modifier Rules')
        }
        if (toolesParentWithChilds.children.length !== 0)
            menuItems.push(toolesParentWithChilds)
        if (insuranceParentWithChilds.children.length !== 0)
            menuItems.push(insuranceParentWithChilds)

    }
    private static filterCriteria(str: string): boolean {
        return str.includes('billing');
    }
}