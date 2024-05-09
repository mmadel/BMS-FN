import { PaymentBalanceStatementPermission } from "./payment.balance.statement.permission"
import { PaymentBatchClientPermission } from "./payment.batch.client.permission"
import { PaymentBatchInsurancePermission } from "./payment.batch.insurnace.permission"

export interface PaymentSubPermission{
    paymentBatchInsurancePermission?:PaymentBatchInsurancePermission
    paymentBatchClientPermission?:PaymentBatchClientPermission
    paymentBalanceStatementPermission?:PaymentBalanceStatementPermission
}