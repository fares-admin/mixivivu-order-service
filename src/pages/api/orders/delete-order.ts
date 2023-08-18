import { NextApiRequest, NextApiResponse } from 'next'

import { InternalAuthService } from '@/src/service/internal-auth-service/internal-auth-service'
import { OrderService } from '@/src/service/order-service/order-service'
import { wrapperEndpoint } from 'common-abstract-fares-system'

/*
    @ericchen:

    put your explanation here
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new OrderService()
  const internalService = new InternalAuthService()
  const authResult = await internalService.authUserToken(req.headers.authorization || '')
  if (!authResult.success) {
    res.status(200).json(authResult)
  }
  const result = await wrapperEndpoint(req, 'DELETE', service.deleteOrder(req.query.ids as string))
  res.status(200).json(result)
}
