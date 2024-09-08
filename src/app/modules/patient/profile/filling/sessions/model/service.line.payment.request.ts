import { ServiceLinePayment } from "./service.line.payment";

export interface ServiceLinePaymentRequest {
    id?: number;
    serviceLinePaymentType?: string | null,
    paymentEntityId?:number
    paymentMethod?: string | null,
    totalAmount?: number,
    receivedDate?: number,
    receivedDate_date?: Date;
    checkDate?: number;
    checkDate_date?: Date
    depositDate?: number,
    depositDate_date?: Date,
    authtDate?: number,
    authtDate_date?: Date
    checkNumber?: string,
    authNumber?: number
    insuranceCompany?: string;
    serviceLinePayments?: ServiceLinePayment[]
}