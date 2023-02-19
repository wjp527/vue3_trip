import { defineStore } from 'pinia'
// 接口
import { reqHouseDetailsById } from '@/service/modules/details'

// 类型
import type {
  THouseDetailById,
  IHouseDetails,
  TGetMainPart,
  TGetSwiper
} from './types'
const useDetails = defineStore('details', {
  state: (): IHouseDetails => ({
    // 酒店详情
    houseDetails: []
  }),

  getters: {
    getMainPart(): TGetMainPart {
      return this.houseDetails?.mainPart
    },
    getSwiper(): TGetSwiper {
      return this.houseDetails?.mainPart.topModule.housePicture.housePics
    }
  },

  actions: {
    // 获取酒店详情
    async getHouseDetailsByIdAsync(id: THouseDetailById) {
      const res = await reqHouseDetailsById(id)
      this.houseDetails = res.data
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useDetails
