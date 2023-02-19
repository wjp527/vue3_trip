import { defineStore } from 'pinia'
// 获取城市数据(国内外)
import { reqCityAll } from '@/service/modules'
const useCity = defineStore('city', {
  state: () => ({
    // 城市数据(国内外)
    cities: [],
    // 当前所在城市
    currentCity: {
      cityName: '广州'
    }
  }),

  getters: {},
  actions: {
    // 获取城市数据
    async getCityAll() {
      const res = await reqCityAll()
      this.cities = res.data
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useCity
