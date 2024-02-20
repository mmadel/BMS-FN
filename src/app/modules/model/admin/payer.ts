import { BasicAddress } from "../common/basic.address"

export interface Payer {
    id?: number
    name?: string
    displayName?: string
    payerId?: string
    address?: BasicAddress
    payerType?:string;
}