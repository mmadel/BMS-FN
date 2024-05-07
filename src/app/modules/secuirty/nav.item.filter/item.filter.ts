import { INavData } from "@coreui/angular-pro";
import { navItems } from "src/app/core/layout/_nav";

export class ItemFilter{
    public static filterNavItems(returnedNavItems: string[]): INavData[] {
        var filteredNavItem: INavData[] = []
        var navMenuItems: INavData[] = navItems;
        for (var i = 0; i < returnedNavItems.length; i++) {
            const [parentName, childNames] = returnedNavItems[i].split('-');
            var navItm: INavData = navMenuItems.find(item => item.name === parentName)
            if (childNames === undefined)
                filteredNavItem.push(navItm);
            if (childNames !== undefined) {
                var childList: string[] = childNames.split(',')
                var children: INavData[] = [];
                for (var j = 0; j < navItm.children?.length; j++) {
                    var child: INavData = navItm.children[j];
                    if (childList.includes(child.name))
                        children.push(child);
                }
                navItm.children = children
                filteredNavItem.push(navItm);
            }
        }
        return filteredNavItem;
    }
}