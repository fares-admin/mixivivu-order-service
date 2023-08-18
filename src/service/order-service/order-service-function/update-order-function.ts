import { Order } from '@/src/repository/order-repository/order-entity'
import { CommonResponse, validate } from 'common-abstract-fares-system'
import { OrderReqValidator, OrderRequest, OrderRequestError } from '../order-req'

import { OrderRepository } from '@/src/repository/order-repository/order-repository'
import mongoose from 'mongoose'

/*
      @ericchen:
  
      put your explanation here
  */

export const updateOrderFunction = async (
  req: OrderRequest,
  id: string,
  repository: OrderRepository
): Promise<CommonResponse<OrderRequestError | string>> => {
  const validateRes = await validate(req, OrderReqValidator, { id })
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
  const res = {
    success: false,
    message: '',
    result: {
      amount: '',
      detail: '',
      status: '',
      paymentContent: '',
      email: '',
      phone: '',
      customerName: '',
      note: '',
    },
    status: 400,
  }
  if (!id || !mongoose.isValidObjectId(id)) {
    return {
      ...res,
      message: 'invalid order id',
    }
  }
  const entity: Order = {
    ...new Order(),
    ...req,
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
