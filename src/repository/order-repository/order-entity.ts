import mongoose from 'mongoose'

export interface OrderDetail {
  data: object
  amount: number
}

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  CANCEL = 'cancel',
}

export class Order {
  _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  amount: number = 0

  detail: OrderDetail[] = []

  status: PaymentStatus = PaymentStatus.PENDING

  paymentContent: string = ''

  email: string = ''

  phone: string = ''

  customerName: string = ''

  note: string = ''

  code: string = ''

  codeExpired: Date = new Date()
}

export const OrderSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  amount: Number,
  detail: Array<{ amount: Number; data: Object }>,
  status: String,
  paymentContent: String,
  email: String,
  phone: String,
  customerName: String,
  note: String,
  code: String,
  codeExpired: Date,
})
