import { AdminSubPermission } from "./admin.sub.permission"

export interface AdminPermission {
    isHidden?: boolean
    isViewOnly?: boolean
    isModify?: boolean

    adminSubPermission?: AdminSubPermission
}