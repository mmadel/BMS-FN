import { BasicAddress } from "../common/basic.address";

export interface IsuranceCompany {
    id?: number
    name?: string
    address?: BasicAddress
    payerId?: number;
    assigner?: string[];
}