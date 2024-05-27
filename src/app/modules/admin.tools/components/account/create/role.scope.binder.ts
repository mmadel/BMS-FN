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

                case Role.BATCH_CLIENT_PAYMENT_ROLE:
                    this.bindBatchClientRole(roleScope[i].scope)
                    break;

                case Role.BATCH_INSURANCE_PAYMENT_ROLE:
                    this.bindBatchInsuranceRole(roleScope[i].scope);
                    break;

                case Role.BALANCE_STATEMENT_PAYMENT_ROLE:
                    this.bindBalanceStatementRole(roleScope[i].scope)
                    break;
                case Role.SESSION_PAYMENT_ROLE:
                    this.bindSessionPaymentRole(roleScope[i].scope)
                    break;
                case Role.FILING_ROLE:
                    this.bindFilingRole(roleScope[i].scope)
                    break;
                case Role.ADMIN_TOOL_ROLE:
                    this.bindAdminToolsRole(roleScope[i].scope)
                    break;

                case Role.GROUP_INFO_ADMIN_TOOL_ROLE:
                    this.bindGrouoInfoRole(roleScope[i].scope)
                    break;

                case Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE:
                    this.bindInsuranceMappingRole(roleScope[i].scope)
                    break;

                case Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE:
                    this.bindAccountManagementRole(roleScope[i].scope)
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
            case Scope.HIDDENSCOPE:
                this.roleBinder.billingH = true
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
            case Scope.HIDDENSCOPE:
                this.roleBinder.providerH = true
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
            case Scope.HIDDENSCOPE:
                this.roleBinder.clientH = true
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
            case Scope.HIDDENSCOPE:
                this.roleBinder.filingH = true
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
            case Scope.HIDDENSCOPE:
                this.roleBinder.paymentH = true
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
            case Scope.HIDDENSCOPE:
                this.roleBinder.adminToolH = true
                break;
        }
    }

    private static bindBillingInsuranceAreaRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.billing_insuranceV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.billing_insuranceM = true
                break;
            case Scope.HIDDENSCOPE:
                this.roleBinder.billing_insuranceH = true
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
            case Scope.HIDDENSCOPE:
                this.roleBinder.billing_FeeH = true
                break
        }
    }
    private static bindBillingModifierRuleRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.billing_Modifier_RuleV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.billing_Modifier_RuleM = true
                break;
            case Scope.HIDDENSCOPE:
                this.roleBinder.billing_Modifier_RuleH = true
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
            case Scope.HIDDENSCOPE:
                this.roleBinder.solidProviderH = true
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
            case Scope.HIDDENSCOPE:
                this.roleBinder.referringProviderH = true
                break;
        }
    }
    private static bindBatchClientRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.batchClientpaymentV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.batchClientpaymentM = true
                break;
            case Scope.HIDDENSCOPE:
                this.roleBinder.batchClientpaymentH = true
                break;
        }
    }
    private static bindBatchInsuranceRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.batchInsurancepaymentV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.batchInsurancepaymentM = true
                break;
            case Scope.HIDDENSCOPE:
                this.roleBinder.batchInsurancepaymentH = true
                break;
        }
    }

    private static bindBalanceStatementRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.balanceStatementpaymentV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.balanceStatementpaymentM = true
                break;
            case Scope.HIDDENSCOPE:
                this.roleBinder.balanceStatementpaymentH = true
                break;
        }
    }
    private static bindSessionPaymentRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.sessionpaymentV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.sessionpaymentM = true
                break;
            case Scope.HIDDENSCOPE:
                this.roleBinder.sessionpaymentH = true
                break;
        }
    }

    private static bindGrouoInfoRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.groupInfoAdminToolV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.groupInfoAdminToolM = true
                break;
            case Scope.HIDDENSCOPE:
                this.roleBinder.groupInfoAdminToolH = true
                break;
        }
    }
    private static bindInsuranceMappingRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.insuranceMappingAdminToolV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.insuranceMappingAdminToolM = true
                break;
            case Scope.HIDDENSCOPE:
                this.roleBinder.insuranceMappingAdminToolH = true
                break;
        }
    }

    private static bindAccountManagementRole(scope: string) {
        switch (scope) {
            case Scope.VIEWSCOPE:
                this.roleBinder.accountManagementAdminToolV = true
                break;
            case Scope.MODIFYSCOPE:
                this.roleBinder.accountManagementAdminToolM = true
                break;
            case Scope.HIDDENSCOPE:
                this.roleBinder.accountManagementAdminToolH = true
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