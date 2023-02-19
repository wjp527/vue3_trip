import { defineStore } from 'pinia'
import type { IHots } from './types'

// 接口
import { reqHotSuggests, reqHotRecomment } from '@/service/modules/hotSuggests'

const useHot = defineStore('hot', {
  state: (): IHots => ({
    // 热门建议
    hots: [],
    // 热门推荐
    hotRecommend: []
  }),

  getters: {},

  actions: {
    // 获取热门建议
    async getHotsAsync() {
      const res = await reqHotSuggests()
      this.hots = res.data
    },
    // 获取热门推荐
    async getHotRecommendAsync() {
      const res = await reqHotRecomment()
      this.hotRecommend = res.data
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useHot
