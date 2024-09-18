import { ERADetailsLine } from "./era.details.line";
import { ERAModel } from "./era.model";

export interface ERAHistory{
    historyLines:ERADetailsLine[]
    isArchive:boolean;
    era: ERAModel
}