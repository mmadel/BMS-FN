import { FeeScheduleLine } from "./fee.schedule.line";

export interface FeeSchedule{
    id?:number,
    name?:string
    defaultFee?:boolean,
    active?:boolean
    feeLines?:FeeScheduleLine[]
    provider?:any;
    insurance?:any
}