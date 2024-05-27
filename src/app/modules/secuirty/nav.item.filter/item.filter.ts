import { INavData } from "@coreui/angular-pro";
import { navItems } from "src/app/core/layout/_nav";
import { MenuItem } from "../model/nav.item";

export class ItemFilter {

    public static filterNavItems(returnedNavItems: MenuItem[]): INavData[] {
        // console.log(JSON.stringify(returnedNavItems))
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