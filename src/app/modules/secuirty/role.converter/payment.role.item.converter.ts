export class PaymentRoleItemConverter {
    public static convert(roles: string[], filterItems: string[]) {
        const providerFiltered = roles.filter(this.filterCriteria);
        console.log(JSON.stringify(providerFiltered))
        if (providerFiltered.includes('payment-role')) {
            filterItems.push('Posting');
        } else {
            if (providerFiltered.includes('batch-insurance-payment-role'))
                filterItems.push('Posting-Batch Insurance Payment');
            if (providerFiltered.includes('batch-client-payment-role'))
                filterItems.push('Posting-Batch Client Payment');
            if (providerFiltered.includes('balance-statement-payment-role'))
                filterItems.push('Posting-Client Blance');
        }
    }
    private static filterCriteria(str: string): boolean {
        return str.includes('payment');
    }
}