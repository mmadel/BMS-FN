import { RoleScope } from "src/app/modules/secuirty/model/role.scope";
import { Role } from "src/app/modules/secuirty/model/roles";
import { Scope } from "src/app/modules/secuirty/model/scope";
import { RoleBinder } from "../../model/account/role/role.binder";

export class RoleScopeBinder {
    private static roleBinder: RoleBinder;

    public static bind(roleScope: RoleScope[]): RoleBinder {
        this.initRoleBinder()
        for (var i = 0; i < roleScope.length; i++) {
            switch (roleScope[i].role) {
                case Role.BILLING_ROLE:
                    this.bindBillingRole(roleScope[i].scope)
                    break;

                case Role.INVOICE_BILLING_ROLE:
                    this.bindBillingInsuranceAreaRole(roleScope[i].scope)
                    break;

                case Role.FEE_SCHEDULE_BILLING_ROLE:
                    this.bindBillingFeeRole(roleScope[i].scope)
                    break;

                case Role.MODIFIER_RULE_BILLING_ROLE:
                    this.bindBillingModifierRuleRole(roleScope[i].scope)
                    break;
                case Role.PROVIDER_ROLE:
                    this.bindProviderRole(roleScope[i].scope)
                    break;
                case Role.SOLID_PROVIDER_ROLE:
                    this.bindSolidProviderRole(roleScope[i].scope);
                    break;
                case Role.REFERRING_PROVIDER_ROLE:
                    this.bindReferringProviderRole(roleScope[i].scope);
                    break;
                case Role.PATIENT_ROLE:
                    this.bindClinetRole(roleScope[i].scope)
                    break;
                case Role.PAYMENT_ROLE:
                    this.bindPaymentRole(roleScope[i].scope)
                    break;
                case Role.FILING_ROLE:
                    this.bindFilingRole(roleScope[i].scope)
                    break;
                case Role.ADMIN_TOOL_ROLE:
                    this.bindAdminToolsRole(roleScope[i].scope)
                    break;
            }
        }
        return this.roleBinder;
    }
    private static bindBillingRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.billingV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.billingM = true
                break;
        }
    }
    private static bindProviderRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.providerV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.providerM = true
                break;
        }
    }
    private static bindClinetRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.clientV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.clientM = true
                break;
        }
    }
    private static bindFilingRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.filingV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.filingM = true
                break;
        }
    }
    private static bindPaymentRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.paymentV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.paymentM = true
                break;
        }
    }
    private static bindAdminToolsRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.adminToolV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.adminToolM = true
                break;
        }
    }

    private static bindBillingInsuranceAreaRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.billing_insuranceV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.billing_insuranceV = true
                break;
        }
    }
    private static bindBillingFeeRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.billing_FeeV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.billing_FeeM = true
                break;
        }
    }
    private static bindBillingModifierRuleRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.billing_Modifier_RuleV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.billing_Modifier_RuleV = true
                break;
        }
    }
    private static bindSolidProviderRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.solidProviderV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.solidProviderM = true
                break;
        }
    }
    private static bindReferringProviderRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.referringProviderV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.referringProviderM = true
                break;
        }
    }
    private static initRoleBinder() {
        this.roleBinder = {
            billingH: false,
            billingV: false,
            billingM: false,
            providerH: false,
            providerV: false,
            providerM: false,

            clientH: false,
            clientV: false,
            clientM: false,

            paymentH: false,
            paymentV: false,
            paymentM: false,

            filingH: false,
            filingV: false,
            filingM: false,

            adminToolH: false,
            adminToolV: false,
            adminToolM: false,
        }
    }
}