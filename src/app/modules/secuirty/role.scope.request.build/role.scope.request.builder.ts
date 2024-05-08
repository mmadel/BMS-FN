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
        if (roles.includes("billing-role"))
            requestedRoles.push("billing-role")
        else
            requestedRoles.push(...roles.filter(str => str.endsWith("-billing-role")))
    }
    private static requestPaymentRoles(roles: string[], requestedRoles: string[]) {
        if (roles.includes("payment-role"))
            requestedRoles.push("payment-role")
        else
            requestedRoles.push(...roles.filter(str => str.endsWith("-payment-role")))
    }

    private static requestProviderRoles(roles: string[], requestedRoles: string[]) {
        if (roles.includes("provider-role"))
            requestedRoles.push("provider-role")
        else
            requestedRoles.push(...roles.filter(str => str.endsWith("-provider-role")))
    }

    private static requestAdminToolsRoles(roles: string[], requestedRoles: string[]) {
        if (roles.includes("admin-tool-role"))
            requestedRoles.push("admin-tool-role")
        else
            requestedRoles.push(...roles.filter(str => str.endsWith("-admin-tool-role")))
    }

    private static requestPatientRoles(roles: string[], requestedRoles: string[]) {
        if (roles.includes("patient-role"))
            requestedRoles.push("patient-role");
    }
    private static requestFilingRoles(roles: string[], requestedRoles: string[]) {
        if (roles.includes("filing-role"))
            requestedRoles.push("filing-role");
    }
}