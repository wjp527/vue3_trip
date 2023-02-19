<template>
  <div class="city-group">
    <van-index-bar :sticky="true" :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="hot">
        <template v-for="item in currentGroup?.hotCities" :key="item.cityId">
          <div class="tag" @click="cityClick(item)">{{ item.cityName }}</div>
        </template>
      </div>
      <template v-for="(item, index) in currentGroup?.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <template v-for="i in item.cities" :key="i.cityId">
          <van-cell :title="i.cityName" @click="cityClick(i)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useCity from '@/store/modules/city/city'
const props = defineProps({
  currentGroup: {
    type: Object,
    default: () => ({})
  }
})

const Router = useRouter()
const cityStore = useCity()

// 动态获取索引
let indexList = computed(() => {
  // 获取索引列表
  const list: string[] = props.currentGroup.cities.map(
    (item: any) => item.group
  )
  list.unshift('#')
  return list
})

// 监听城市的点击
const cityClick = (item: any) => {
  console.log(item)
  // let { currentCity } = storeToRefs(cityStore)
  // 选中当前城市
  cityStore.currentCity = item
  // 返回到上一级
  Router.back()
}
</script>

<style lang="less" scoped>
.city-group {
  .hotTitle {
    padding: 0 28px;
    color: var(--primary-color);
    font-weight: 900;
  }
  .hot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 0 16px;
    margin-top: 4px;
  }
  .tag {
    width: 70px;
    height: 28px;
    font-size: 12px;
    border-radius: 14px;
    margin-bottom: 4px;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
  }
}
</style>
