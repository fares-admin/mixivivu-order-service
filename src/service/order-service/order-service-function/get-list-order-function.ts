import { CommonListResult, CommonResponse } from 'common-abstract-fares-system'

import { OrderRepository } from '@/src/repository/order-repository/order-repository'
import mongoose from 'mongoose'
import { NextApiRequest } from 'next'
import { OrderRes } from '../order-res'

/*
      @ericchen:
  
      put your explanation here
  */

export const getListOrderFunc = async (
  req: NextApiRequest,
  repository: OrderRepository,
  getPageAndSize: (req: {
    query: {
      page: number
      size: number
    }
  }) => {
    page: number
    size: number
  },
  pipelines: mongoose.PipelineStage[]
): Promise<CommonResponse<CommonListResult<OrderRes> | string>> => {
  const { page, size } = getPageAndSize(req as any)
  const result = await repository.find(page, size, pipelines)
  if (!result.result) {
    return {
      status: 500,
      message: 'sv error',
      success: true,
      result: '',
    }
  }
  return {
    status: 200,
    message: 'ok',
    success: true,
    result: {
      ...result.result,
      data: result.result.data.map((item) => {
        return {
          ...item,
          _id: item._id.toString(),
        }
      }),
    },
  }
}
