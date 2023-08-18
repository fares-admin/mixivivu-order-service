import { Order, OrderSchema } from './order-entity'

import { CommonRepository } from 'common-abstract-fares-system'

export class OrderRepository extends CommonRepository<Order> {
  constructor() {
    super(OrderSchema, 'orders')
  }
}
