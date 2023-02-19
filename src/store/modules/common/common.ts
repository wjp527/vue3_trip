import { defineStore } from 'pinia'

const useCommon = defineStore('common', {
  state: () => ({
    // 是否显示loading效果
    loading: false
  }),

  getters: {},

  actions: {},
  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useCommon
