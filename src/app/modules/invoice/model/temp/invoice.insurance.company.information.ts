import id from "date-fns/locale/id";
import { BasicAddress } from "src/app/modules/model/common/basic.address";
import { OtherPatientInsurance } from "./other.patient.insurance";

export interface InvoiceInsuranceCompanyInformation {
    name: string;
    id:number;
    address: BasicAddress;
    visibility: string;
    assigner: string[];
    isAssignment: boolean;
    signature: string
    insuranceType: string
    numberOfActivePatientInsurances: number;
    policyInformation:string[]
    otherInsurances:OtherPatientInsurance[]
}