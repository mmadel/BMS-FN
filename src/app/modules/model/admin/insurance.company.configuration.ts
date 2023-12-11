import { Organization } from "./organiztion";

export interface InsuranceCompanyConfiguration {
    box32?: boolean;
    box26?: string;
    billingProvider?: Organization
    insuranceCompnayIdentifier: number;
}