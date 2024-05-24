import { Role } from "../model/roles";

export class RoleScopeRequestBuilder {
    public static builder(roles: string[]): string[] {
        var requestedRoles: string[] = [];
        for (var i = 0; i < roles.length; i++) {
            this.requestBillingRoles(roles[i], roles, requestedRoles);
            this.requestPaymentRoles(roles[i], roles, requestedRoles);
            this.requestProviderRoles(roles[i], roles, requestedRoles);
            this.requestAdminToolsRoles(roles[i], roles, requestedRoles)
            this.requestPatientRoles(roles[i], roles, requestedRoles);
            this.requestFilingRoles(roles[i], roles, requestedRoles)
        }
        return requestedRoles;
    }
    private static requestBillingRoles(role: string, roles: string[], requestedRoles: string[]) {
        if (role === Role.BILLING_ROLE)
            requestedRoles.push(Role.BILLING_ROLE)
        else {
            if (role === Role.INVOICE_BILLING_ROLE)
                requestedRoles.push(Role.INVOICE_BILLING_ROLE)
            if (role === Role.FEE_SCHEDULE_BILLING_ROLE)
                requestedRoles.push(Role.FEE_SCHEDULE_BILLING_ROLE)
            if (role === Role.MODIFIER_RULE_BILLING_ROLE)
                requestedRoles.push(Role.MODIFIER_RULE_BILLING_ROLE)
        }



    }
    private static requestPaymentRoles(role: string, roles: string[], requestedRoles: string[]) {
        if (role === Role.PAYMENT_ROLE)
            requestedRoles.push(Role.PAYMENT_ROLE)
        else {
            if (role === Role.BATCH_CLIENT_PAYMENT_ROLE)
                requestedRoles.push(Role.BATCH_CLIENT_PAYMENT_ROLE)
            if (role === Role.BATCH_INSURANCE_PAYMENT_ROLE)
                requestedRoles.push(Role.BATCH_INSURANCE_PAYMENT_ROLE)
            if (role === Role.BALANCE_STATEMENT_PAYMENT_ROLE)
                requestedRoles.push(Role.BALANCE_STATEMENT_PAYMENT_ROLE)
            if (role === Role.SESSION_PAYMENT_ROLE)
                requestedRoles.push(Role.SESSION_PAYMENT_ROLE)
        }
    }

    private static requestProviderRoles(role: string, roles: string[], requestedRoles: string[]) {
        if (role === Role.PROVIDER_ROLE)
            requestedRoles.push(Role.PROVIDER_ROLE)
        else {
            if (role === Role.SOLID_PROVIDER_ROLE)
                requestedRoles.push(Role.SOLID_PROVIDER_ROLE)
            if (role === Role.REFERRING_PROVIDER_ROLE)
                requestedRoles.push(Role.REFERRING_PROVIDER_ROLE)
        }
    }

    private static requestAdminToolsRoles(role: string, roles: string[], requestedRoles: string[]) {
        if (role === Role.ADMIN_TOOL_ROLE)
            requestedRoles.push(Role.ADMIN_TOOL_ROLE)
        else {
            if (role === Role.GROUP_INFO_ADMIN_TOOL_ROLE)
                requestedRoles.push(Role.GROUP_INFO_ADMIN_TOOL_ROLE)
            if (role === Role.SESSION_DEFAULT_ADMIN_TOOL_ROLE)
                requestedRoles.push(Role.SESSION_DEFAULT_ADMIN_TOOL_ROLE)
            if (role === Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE)
                requestedRoles.push(Role.INSURANCE_MAPPING_ADMIN_TOOL_ROLE)
            if (role === Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE)
                requestedRoles.push(Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE)
        }
    }

    private static requestPatientRoles(role: string, roles: string[], requestedRoles: string[]) {
        if (role === Role.PATIENT_ROLE)
            requestedRoles.push(Role.PATIENT_ROLE);
    }
    private static requestFilingRoles(role: string, roles: string[], requestedRoles: string[]) {
        if (role === Role.FILING_ROLE)
            requestedRoles.push(Role.FILING_ROLE);
    }
}