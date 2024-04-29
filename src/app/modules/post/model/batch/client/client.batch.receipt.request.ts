import { ClientBatchReceiptDetailsPaymentInfo } from "./client.batch.receipt.details.payment.info";
import { ClientBatchReceiptLocationInfo } from "./client.batch.receipt.location.info";
import { ClientBatchReceiptPatientInfo } from "./client.batch.receipt.patient.info";

export interface ClientBatchReceiptRequest{
    clientBatchReceiptPatientInfo?: ClientBatchReceiptPatientInfo
    clientBatchReceiptPaymentInfo?:ClientBatchReceiptPatientInfo
    paymentDetails?:ClientBatchReceiptDetailsPaymentInfo[]
    clientBatchReceiptLocationInfo?:ClientBatchReceiptLocationInfo[]
}