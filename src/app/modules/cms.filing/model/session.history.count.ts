import { ServiceCode } from "../../model/clinical/session/service.code";

export interface SessionHistoryCount{
    sessionId?:number;
    serviceLines?:number;
    dateOfService?:number
    serviceLine?:ServiceCode[];
}