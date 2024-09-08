import { ERALineHistory } from "./er.line.history";
import { ERAModel } from "./era.model";

export interface ERAHistory{
    historyLines:ERALineHistory[]
    isArchive:boolean;
    era: ERAModel
}