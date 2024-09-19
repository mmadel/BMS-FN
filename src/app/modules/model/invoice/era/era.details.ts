import { ClaimAdjustmentReasonCode } from "./claim.adjust.reason.code";
import { ERADetailsLine } from "./era.details.line";

export interface ERADetails {
    totalPaidAmount: number;
    paymentMethod: number;
    checkNumber: string;
    eraDate: string;
    totalPaid: number;
    chekType: string;
    payerName: string
    eraId: number
    lines: ERADetailsLine[]
    patientLines: { [key: string]: ERADetailsLine[] }
    claimAdjustmentReasonCodes: ClaimAdjustmentReasonCode[]
}