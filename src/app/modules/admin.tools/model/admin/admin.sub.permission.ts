import { AdminAccountPermission } from "./admin.account.permission"
import { AdminGroupInfoPermission } from "./admin.group.info.permission"
import { AdminInsuranceMappingPermission } from "./admin.insurance.mapping.permission"

export interface AdminSubPermission {
    adminGroupInfoPermission?: AdminGroupInfoPermission
    adminInsuranceMappingPermission?: AdminInsuranceMappingPermission
    adminAccountPermission?: AdminAccountPermission
}