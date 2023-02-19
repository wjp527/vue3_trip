import pRequest from '..'

// 类型判断
import type { THouseDetailById } from '@/store/modules/details/types'
export function reqHouseDetailsById(id: THouseDetailById) {
  return pRequest.get<any>({
    url: `/detail/infos?houseId=${id}`
  })
}
