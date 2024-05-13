import { Role } from "../model/roles";

export class RoleScopeRequestBuilder {
    public static builder(roles: string[]): string[] {
        var requestedRoles: string[] = [];
        this.requestBillingRoles(roles, requestedRoles);
        this.requestPaymentRoles(roles, requestedRoles);
        this.requestProviderRoles(roles, requestedRoles);
        this.requestAdminToolsRoles(roles, requestedRoles)
        this.requestPatientRoles(roles, requestedRoles);
        this.requestFilingRoles(roles, requestedRoles)
        return requestedRoles;
    }
    private static requestBillingRoles(roles: string[], requestedRoles: string[]) {
        if (roles.includes(Role.BILLING_ROLE))
            requestedRoles.push(Role.BILLING_ROLE)
        else
            requestedRoles.push(...roles.filter(str => str.endsWith("-" + Role.BILLING_ROLE)))
    }
    private static requestPaymentRoles(roles: string[], requestedRoles: string[]) {
        if (roles.includes(Role.PAYMENT_ROLE))
            requestedRoles.push(Role.PAYMENT_ROLE)
        else
            requestedRoles.push(...roles.filter(str => str.endsWith("-"+Role.PAYMENT_ROLE)))
    }

    private static requestProviderRoles(roles: string[], requestedRoles: string[]) {
        if (roles.includes(Role.PROVIDER_ROLE))
            requestedRoles.push(Role.PROVIDER_ROLE)
        else
            requestedRoles.push(...roles.filter(str => str.endsWith("-" + Role.PROVIDER_ROLE)))
    }

    private static requestAdminToolsRoles(roles: string[], requestedRoles: string[]) {
        if (roles.includes(Role.ADMIN_TOOL_ROLE))
            requestedRoles.push(Role.ADMIN_TOOL_ROLE)
        else
            requestedRoles.push(...roles.filter(str => str.endsWith("-"+Role.ADMIN_TOOL_ROLE)))
    }

    private static requestPatientRoles(roles: string[], requestedRoles: string[]) {
        if (roles.includes(Role.PATIENT_ROLE))
            requestedRoles.push(Role.PATIENT_ROLE);
    }
    private static requestFilingRoles(roles: string[], requestedRoles: string[]) {
        if (roles.includes(Role.FILING_ROLE))
            requestedRoles.push(Role.FILING_ROLE);
    }
}