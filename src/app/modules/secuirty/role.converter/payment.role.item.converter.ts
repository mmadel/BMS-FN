import { MenuItem } from "../model/nav.item";
import { Role } from "../model/roles";

export class PaymentRoleItemConverter {
    public static convert(roles: string[], menuItems: MenuItem[]) {
        var parentWithNoChilds: MenuItem
        var parentWithChilds: MenuItem = {
            parent: "Posting",
            children: []
        }
        console.log(JSON.stringify(roles))
        for (var i = 0; i < roles.length; i++) {
            if (roles[i] === Role.PAYMENT_ROLE) {
                parentWithNoChilds = {
                    parent: "Posting"
                }
                menuItems.push(parentWithNoChilds)
                return;
            }
            if (roles[i] === Role.BATCH_INSURANCE_PAYMENT_ROLE)
                parentWithChilds.children.push('Batch Insurance Payment')
            if (roles[i] === Role.BATCH_CLIENT_PAYMENT_ROLE)
                parentWithChilds.children.push('Batch Client Payment')
            if (roles[i] === Role.BALANCE_STATEMENT_PAYMENT_ROLE)
                parentWithChilds.children.push('Client Blance')
        }
        menuItems.push(parentWithChilds)
    }

}