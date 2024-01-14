import { BasicAddress } from "src/app/modules/model/common/basic.address";
import { Gender } from "src/app/modules/model/enum/geneder";

export interface InvoicePatientInsuredInformation{
    primaryId:string;
     relationToInsured:string;
     firstName:string;
     lastName:string;
     dateOfBirth:number;
     gender: Gender;
	 address:BasicAddress;
     phone:string;
}