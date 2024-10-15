import { Facility } from "../../administration/component/facility/facility.info.component";
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
    facilities?: Facility[];
}