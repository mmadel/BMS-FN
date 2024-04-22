import { InsuranceCompanyHolder } from "src/app/modules/model/admin/insurance.company.holder";
import { SimpleProvider } from "src/app/modules/model/clinical/provider/simple.provider";

export interface FeeScheduleMetaData{
    insurances:InsuranceCompanyHolder[]
    providers:SimpleProvider[]
}