import { FeeScheduleLine } from "./fee.schedule.line";

export interface FeeSchedule{
    id?:number,
    defaultFee?:boolean,
    feeLines?:FeeScheduleLine[]
    provider?:any;
    planType?:any
}