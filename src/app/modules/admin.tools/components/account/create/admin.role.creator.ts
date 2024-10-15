import { RoleScope } from "src/app/modules/secuirty/model/role.scope";
import { Role } from "src/app/modules/secuirty/model/roles";
import { Scope } from "src/app/modules/secuirty/model/scope";

export class AdministratorRoleCreator {
    public static create(): RoleScope[] {
        var roleScopes: RoleScope[] = [{ role: Role.PATIENT_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.PATIENT_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.BILLING_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.INVOICE_BILLING_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.FEE_SCHEDULE_BILLING_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.MODIFIER_RULE_BILLING_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.FILING_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.PROVIDER_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.SOLID_PROVIDER_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.REFERRING_PROVIDER_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.PAYMENT_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.BATCH_INSURANCE_PAYMENT_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.BATCH_CLIENT_PAYMENT_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.BALANCE_STATEMENT_PAYMENT_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.SESSION_PAYMENT_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.ADMIN_TOOL_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.GROUP_INFO_ADMIN_TOOL_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.SESSION_DEFAULT_ADMIN_TOOL_ROLE, scope: Scope.MODIFYSCOPE }
            , { role: Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE, scope: Scope.MODIFYSCOPE }]
        return roleScopes;
    }
}