import { PaymentBatch } from "src/app/modules/model/posting/batch.paymnet";
import { PaymentServiceLine } from "src/app/modules/model/posting/payment.service.line";

export class PaymentLinesConstructor {
    public static construct(items: any[], paymentBatch: PaymentBatch): PaymentServiceLine[] {
        var paymentLines: PaymentServiceLine[] = [];
        for (var i = 0; i < items.length; i++) {
            var item: any = items[i];
            var isPaymentChanged: boolean = item.payment !== null && item.adjust != null
            if (isPaymentChanged) {
                var PaymentServiceLine: PaymentServiceLine = {
                    sessionId: item.sessionId,
                    serviceCodeId: item.serviceCodeId,
                    dateOfService: item.dateOfService,
                    cpt: item.cpt,
                    provider: item.provider,
                    billedValue: item.billedValue,
                    previousPayments: item.previousPayments,
                    payment: item.payment,
                    prevPayment: item.prevPayment,
                    adjust: item.adjust,
                    prevAdjust: item.prevAdjust,
                    balance: item.balance,
                    sessionAction: item.sessionAction,
                    paymentBatch: paymentBatch
                }
                paymentLines.push(PaymentServiceLine);
            }
        }
        return paymentLines;
    }
    public static validate(items: any[]): any[] {
        var invalidServiceCode: any[] = [];
        for (var i = 0; i < items.length; i++) {
            var item: any = items[i];
            var isPaymentChanged: boolean = item.payment !== null && item.adjust
            if (item.sessionAction === null && isPaymentChanged)
                invalidServiceCode.push(Number(item.serviceCodeId));
        }
        return invalidServiceCode
    }
}