import { Organization } from "../../model/admin/organiztion";

export interface BillingProviderConfiguration {
    box33: boolean;
    billingProvider?: Organization;
}