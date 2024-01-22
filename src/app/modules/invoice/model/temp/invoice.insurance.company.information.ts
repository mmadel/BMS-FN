import { BasicAddress } from "src/app/modules/model/common/basic.address";

export interface InvoiceInsuranceCompanyInformation{
    name:string;
	 address:BasicAddress;
     visibility:string;
     assigner:string[];
}