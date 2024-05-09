import { RoleScope } from "src/app/modules/secuirty/model/role.scope";

export interface User {
    id?: number,
    uuid?: string,
    name?: string;
    firstName?: string
    lastName?: string
    accountID?: string
    email?: string
    roleScope?: RoleScope[]
}