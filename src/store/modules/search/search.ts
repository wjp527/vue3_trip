import { defineStore } from 'pinia'

const useSearch = defineStore('search', {
  state: () => ({
    cities: []
  }),

  getters: {},
  actions: {},
  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useSearch
