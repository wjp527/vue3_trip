import pRequest from '../index'

export function reqCityAll() {
  return pRequest.get<any>({
    url: '/city/all'
  })
}
