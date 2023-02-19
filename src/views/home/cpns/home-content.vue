<template>
  <div class="section home-content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <HouseItemV9
          :itemData="item.data"
          v-if="item.discoveryContentType === 9"
          @click="itemChick(item.data.houseId)"
        />
        <HouseItemV3
          :itemData="item.data"
          v-else
          @click="itemChick(item.data.houseId)"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

// store
import useHouse from '@/store/modules/home/home'

// 组件
import HouseItemV9 from '@/components/house-item-v9/index.vue'
import HouseItemV3 from '@/components/house-item-v3/index.vue'
const houseStore = useHouse()

const { houseList } = storeToRefs(houseStore)

const Router = useRouter()
const itemChick = (id: any) => {
  Router.push(`/details/${id}`)
}
</script>

<style lang="less" scoped>
.section {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}
.home-content {
  margin-bottom: 100px;
  .title {
    margin-bottom: 6px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
