import { FeeScheduleLine } from "./fee.schedule.line";

export interface FeeSchedule{
    id?:number,
    name?:string
    defaultFee?:boolean,
    feeLines?:FeeScheduleLine[]
    provider?:any;
    planType?:any
}