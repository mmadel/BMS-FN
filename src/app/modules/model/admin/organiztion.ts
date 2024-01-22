import { OrganizationData } from "./organization.data";

export interface Organization {
    id?:number;
    businessName?: string,
    firstName?: string,
    lastName?: string,
    npi?: string,
    organizationData?: OrganizationData;
    type?:string
}