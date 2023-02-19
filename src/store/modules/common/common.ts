import { defineStore } from 'pinia'

const useCommon = defineStore('common', {
  state: () => ({
    // 是否显示loading效果
    loading: false
  }),

  getters: {},

  actions: {}
})

export default useCommon
