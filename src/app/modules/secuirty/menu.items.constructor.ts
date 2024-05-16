import { INavData } from "@coreui/angular-pro";
import { navItems } from "src/app/core/layout/_nav";
import { MenuItem } from "./model/nav.item";
import { AdminToolRoleToItemConverter } from "./role.converter/admin.tool.role.item.converter";
import { BillingRoleToItemConverter } from "./role.converter/billing.role.item.converter";
import { ClientRoleItemConverter } from "./role.converter/client.role.item.converter";
import { FilingRoleItemConverter } from "./role.converter/filing.role.item.converter";
import { PaymentRoleItemConverter } from "./role.converter/payment.role.item.converter";
import { ProviderRoleItemConverter } from "./role.converter/provider.role.item.converter";

export class MenuItemsConstructor {
    public static construct(roles: string[]) {
        var menuItems: MenuItem[] = []
        ClientRoleItemConverter.convert(roles, menuItems);
        ProviderRoleItemConverter.convert(roles, menuItems)
        FilingRoleItemConverter.convert(roles, menuItems)
        BillingRoleToItemConverter.convert(roles, menuItems);
        PaymentRoleItemConverter.convert(roles, menuItems)
        AdminToolRoleToItemConverter.convert(roles, menuItems)
        return this.filterNavItems(menuItems)
    }
    private static filterNavItems(returnedNavItems: MenuItem[]): INavData[] {
        var navMenuItems: INavData[] = navItems;
        var filteredNavItem: INavData[] = []
        for (var i = 0; i < returnedNavItems.length; i++) {
            var navItm: INavData = navMenuItems.find(item => item.name === returnedNavItems[i].parent)
            filteredNavItem.push(navItm);
            if (returnedNavItems[i].children !== undefined) {
                var parent: INavData = navMenuItems.find(item => item.name === returnedNavItems[i].parent)
                parent.children = parent.children.filter(item => returnedNavItems[i].children.includes(item.name))

            }
        }
        return filteredNavItem;
    }
}