import { OrderDetail, PaymentStatus } from '@/src/repository/order-repository/order-entity'

export class OrderRes {
  _id: string = ''

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
