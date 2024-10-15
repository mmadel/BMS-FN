import { Clinic } from "./clinic";
import { OrganizationData } from "./organization.data";
import { User } from "./user/user";

export interface Organization {
    id?: number;
    businessName?: string,
    firstName?: string,
    lastName?: string,
    npi?: string,
    organizationData?: OrganizationData;
    type?: string
    user?: User
    clinics?: Clinic[]
}