import { ERAModel } from "./era.model";

export interface ERAHistory{
    eraLines:number[]
    isArchive:boolean;
    era: ERAModel
}