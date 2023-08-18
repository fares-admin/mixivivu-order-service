import { OrderDetail, PaymentStatus } from '@/src/repository/order-repository/order-entity'
import { IS_EMAIL, IS_PHONE, IS_REQUIRED, ObjectValidator } from 'common-abstract-fares-system'

export class OrderRequest {
  amount: number = 0

  detail: OrderDetail[] = []

  status: PaymentStatus = PaymentStatus.PENDING

  paymentContent: string = ''

  email: string = ''

  phone: string = ''

  customerName: string = ''

  note: string = ''
}

export const OrderReqValidator: ObjectValidator<OrderRequest> = {
  amount: IS_REQUIRED,
  detail: IS_REQUIRED,
  status: IS_REQUIRED,
  paymentContent: IS_REQUIRED,
  email: IS_EMAIL,
  phone: IS_PHONE,
  customerName: IS_REQUIRED,
  note: IS_REQUIRED,
}

export type OrderRequestError = Record<keyof OrderRequest, string>
