export interface InvoiceBillingProviderInformation {
    businessName: string;
    address:string
    city_state_zip:string;
    phone: string;
    ssn: string;
    taxId: string;
    identifierFlag?: Boolean;
}