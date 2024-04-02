import { ServiceLinePayment } from "./service.line.payment";

export interface ServiceLinePaymentRequest {
    id?: number;
    serviceLinePaymentType?: string | null,
    totalAmount?: number,
    paymentMethod?: string,
    receivedDate?: number,
    checkDate?: number;
    checkNumber?: number,
    depositDate?: number,
    insuranceCompany?: string;
    serviceLinePayments?: ServiceLinePayment[]
}