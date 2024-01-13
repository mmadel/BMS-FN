import { Payer } from "./payer";

export interface IsuranceCompanyMapper {
    id?:number
    insuranceCompanyId?: number;
    payer?: Payer;
}