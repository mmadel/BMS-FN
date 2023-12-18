export interface PaymentBatch {
    totalAmount?: number;
    paymentMethod?: string
    receivedDate?: number;
    receivedDate_date?:Date;
    checkDate?: number;
    checkDate_date?:Date;
    checkNumber?: number
    depositDate?: number
    depositDate_date?:Date;
}