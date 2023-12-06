import { OrganizationData } from "./organization.data";

export interface Organization {
    businessName?: string,
    firstName?: string,
    lastName?: string,
    npi?: string,
    organizationData?: OrganizationData;
}