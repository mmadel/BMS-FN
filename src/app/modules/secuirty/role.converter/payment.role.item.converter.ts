import { Role } from "../model/roles";

export class PaymentRoleItemConverter {
    public static convert(roles: string[], filterItems: string[]) {
        const providerFiltered = roles.filter(this.filterCriteria);
        if (providerFiltered.includes(Role.PAYMENT_ROLE)) {
            filterItems.push('Posting');
        } else {
            if (providerFiltered.includes(Role.BATCH_INSURANCE_PAYMENT_ROLE))
                filterItems.push('Posting-Batch Insurance Payment');
            if (providerFiltered.includes(Role.BATCH_CLIENT_PAYMENT_ROLE))
                filterItems.push('Posting-Batch Client Payment');
            if (providerFiltered.includes(Role.BALANCE_STATEMENT_PAYMENT_ROLE))
                filterItems.push('Posting-Client Blance');
        }
    }
    private static filterCriteria(str: string): boolean {
        return str.includes('payment');
    }
}