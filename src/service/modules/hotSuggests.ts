import pRequest from '@/service'

// 获取热门建议
export function reqHotSuggests() {
  return pRequest.get<any>({
    url: '/home/hotSuggests'
  })
}

// 获取热门推荐
export function reqHotRecomment() {
  return pRequest.get<any>({
    url: '/home/categories'
  })
}
