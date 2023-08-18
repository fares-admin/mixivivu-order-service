import { NextApiRequest, NextApiResponse } from 'next'

import { OrderService } from '@/src/service/order-service/order-service'
import { wrapperEndpoint } from 'common-abstract-fares-system'

/*
    @ericchen:

    put your explanation here
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new OrderService()
  const result = await wrapperEndpoint(req, 'GET', service.getListOrder(req))
  res.status(200).json(result)
}
