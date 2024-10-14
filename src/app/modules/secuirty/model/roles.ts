export class Role {
    public static readonly ADMIN = 'admin-biller';
    public static readonly PATIENT_ROLE = 'patient-role';

    public static readonly BILLING_ROLE = 'billing-role';
    public static readonly INVOICE_BILLING_ROLE = 'invoice-billing-role';
    public static readonly FEE_SCHEDULE_BILLING_ROLE = 'fee-schedule-billing-role';
    public static readonly MODIFIER_RULE_BILLING_ROLE = 'modifier-rule-billing-role';

    public static readonly FILING_ROLE = 'filing-role';

    public static readonly PROVIDER_ROLE = 'provider-role';
    public static readonly SOLID_PROVIDER_ROLE = 'soild-provider-role';
    public static readonly REFERRING_PROVIDER_ROLE = 'referring-provider-role';

    public static readonly PAYMENT_ROLE = 'payment-role';
    public static readonly BATCH_INSURANCE_PAYMENT_ROLE = 'batch-insurance-payment-role';
    public static readonly BATCH_CLIENT_PAYMENT_ROLE = 'batch-client-payment-role';
    public static readonly BALANCE_STATEMENT_PAYMENT_ROLE = 'balance-statement-payment-role';
    public static readonly SESSION_PAYMENT_ROLE = 'session-payment-role';

    public static readonly ADMIN_TOOL_ROLE = 'admin-tool-role';
    public static readonly GROUP_INFO_ADMIN_TOOL_ROLE = 'group-info-admin-tool-role';
    public static readonly INSURANCE_MAPPING_ADMIN_TOOL_ROLE = 'insurance-mapping-admin-tool-role';
    public static readonly SESSION_DEFAULT_ADMIN_TOOL_ROLE = 'session-default-admin-tool-role';
    public static readonly ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE = 'account-management-admin-tool-role';
}