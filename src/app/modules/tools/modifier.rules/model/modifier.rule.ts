import { Rule } from "./rule"

export interface ModifierRule {
    id?:number
    name?:string
    defaultRule?:boolean,
    active?:boolean
    rules?:Rule[]
    insuranceCompany?:any
}