import { CommonListResult, CommonResponse, CommonService } from 'common-abstract-fares-system'
import { OrderRequest, OrderRequestError } from './order-req'
import {
  addNewOrderFunction,
  deleteOrderFunction,
  getListOrderFunc,
  updateOrderFunction,
} from './order-service-function'

import { Order } from '@/src/repository/order-repository/order-entity'
import { OrderRepository } from '@/src/repository/order-repository/order-repository'
import { NextApiRequest } from 'next'
import { OrderRes } from './order-res'

export class OrderService extends CommonService<OrderRepository> {
  constructor() {
    super(new OrderRepository())
  }

  public async getListOrder(
    req: NextApiRequest
  ): Promise<CommonResponse<CommonListResult<OrderRes> | string>> {
    return await getListOrderFunc(
      req,
      this.repository,
      this.getPageAndSize,
      this.generatePipelineAggregate(req.query, new Order())
    )
  }

  public async addNewOrder(req: OrderRequest): Promise<CommonResponse<OrderRequestError | string>> {
    return await addNewOrderFunction(req, this.repository)
  }

  public async deleteOrder(ids: string): Promise<CommonResponse<string>> {
    return await deleteOrderFunction(ids, this.repository)
  }

  public async updateOrder(
    req: OrderRequest,
    id: string
  ): Promise<CommonResponse<OrderRequestError | string>> {
    return await updateOrderFunction(req, id, this.repository)
  }
}
