import { defineStore } from 'pinia'
// 接口
import { reqHouseByPage } from '@/service/modules/home'
// 获取房屋列表数据的条件类型/ store里面的数据类型
import type { IHouseList } from './types'
const useHouse = defineStore('house', {
  state: (): IHouseList => ({
    // 房屋列表数据
    houseList: [],
    // 当前请求第几页数据
    currentPage: 0,
    // 酒店 开始结束的时间
    startTime: '',
    endTime: ''
  }),

  getters: {},

  actions: {
    // 获取房屋列表数据
    async getHouseByPageAsync() {
      const res = await reqHouseByPage(++this.currentPage)
      // console.log(this.currentPage)
      this.houseList.push(...res.data)
      // this.houseList = []
      // this.currentPage = 0
      return {
        code: 200
      }
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true
  }
})
export default useHouse
