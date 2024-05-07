export class ClientRoleItemConverter {
    public static convert(roles: string[], filterItems: string[]) {
        filterItems.push('Patient');
    }
}