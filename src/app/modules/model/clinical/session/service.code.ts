import { ServiceLineType } from "../../enum/session/service.line.type";
import { CPTCode } from "../cpt.code";

export interface ServiceCode {
    id?: number
    diagnoses?: string[]
    cptCode?: CPTCode
    type?: ServiceLineType
    isCorrect?: boolean;
    lineNote?: string;
    payments?: number;
}