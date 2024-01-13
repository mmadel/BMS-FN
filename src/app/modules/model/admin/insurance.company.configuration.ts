import { Organization } from "./organiztion";

export interface InsuranceCompanyConfiguration {
    id?:number;
    box32?: boolean;
    box26?: string;
    billingProvider?: Organization
    insuranceCompanyId: number;
    visibility?:string
}