import pRequest from '../index'

import type { IHouseByPage } from '@/store/modules/home/types'
// 获取房屋列表
export function reqHouseByPage(page: IHouseByPage) {
  return pRequest.get<any>({
    url: `/home/houselist?page=${page}`
  })
}
