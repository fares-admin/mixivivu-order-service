import { Order, PaymentStatus } from '@/src/repository/order-repository/order-entity'
import { CommonResponse, validate } from 'common-abstract-fares-system'
import { OrderReqValidator, OrderRequest, OrderRequestError } from '../order-req'

import { OrderRepository } from '@/src/repository/order-repository/order-repository'

/*
      @ericchen:
  
      put your explanation here
  */

export const addNewOrderFunction = async (
  req: OrderRequest,
  repository: OrderRepository
): Promise<CommonResponse<OrderRequestError | string>> => {
  const validateRes = await validate(req, OrderReqValidator)
  if (validateRes.isError) {
    return {
      success: false,
      result: {
        ...validateRes.error,
      },
      message: 'invalidRequest',
      status: 400,
    }
  }
  const now = new Date()
  now.setMinutes(now.getMinutes() + 5)
  const codeExpired = now
  const entity: Order = {
    ...new Order(),
    ...req,
    codeExpired,
    status: PaymentStatus.PENDING,
  }

  const { error } = await repository.insert([{ ...entity }])
  if (error) {
    return {
      status: 500,
      message: error || '',
      result: '',
      success: false,
    }
  }
  return {
    status: 200,
    message: 'ok',
    result: '',
    success: true,
  }
}
