import { Order, PaymentStatus } from '@/src/repository/order-repository/order-entity'
import { CommonResponse, sendEmail, validate } from 'common-abstract-fares-system'
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

  const smtpOption = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: true,
    auth: {
      user: process.env.SMTP_USER || 'user',
      pass: process.env.SMTP_PASSWORD || 'password',
    },
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  await sendEmail(smtpOption, 'fares.sys.vn@gmail.com', {
    to: req.email,
    subject: 'verify create payment code',
    html: `<p>${code}</p>`,
  })

  const now = new Date()
  now.setMinutes(now.getMinutes() + 5)
  const codeExpired = now
  const entity: Order = {
    ...new Order(),
    ...req,
    codeExpired,
    code,
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
