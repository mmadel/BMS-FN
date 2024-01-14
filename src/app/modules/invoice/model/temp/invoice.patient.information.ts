import { BasicAddress } from "src/app/modules/model/common/basic.address";
import { Gender } from "src/app/modules/model/enum/geneder";
import { PatientAdvancedInformation } from "./patient.advanced.information";

export interface InvoicePatientInformation{
    firstName: string;
     lastName: string;
     dateOfBirth: number;
     gender: Gender;
     address: BasicAddress;
     phone: string;
     patientAdvancedInformation: PatientAdvancedInformation;
     ssn: string;
     externalId: string;
     box26: string;
}