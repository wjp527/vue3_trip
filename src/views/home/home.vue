<template>
  <div class="home" ref="homeRef">
    <div class="nav-bar">
      <van-nav-bar title="弘源旅途" />
    </div>
    <div v-if="isShowSearchBar" class="searh-bar">
      <SearchBar />
    </div>

    <!-- 搜索 -->
    <HomeSearchBox />

    <!-- 热门类别 -->
    <HomeCategory />

    <!-- 主题内容 -->
    <HomeContent />
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, computed, onActivated } from 'vue'
// hooks
import useHot from '@/store/modules/hotSuggests/hotSuggests'
import useHouse from '@/store/modules/home/home'
import useScroll from '@/hooks/useScroll'

import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategory from './cpns/home-category.vue'
import HomeContent from './cpns/home-content.vue'
import SearchBar from '@/components/search-bar/index.vue'

// 获取热门建议
let hotsStore = useHot()
let houseStore = useHouse()
hotsStore.getHotsAsync()
// 获取热门类别
hotsStore.getHotRecommendAsync()
// 获取房屋列表数据
houseStore.getHouseByPageAsync()

// 加载更多
// 回调方式
// useScroll(houseStore.getHouseByPageAsync)

// 变量方式
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
// watch监听的数据，必须是响应式的
watch(isReachBottom, async (newValue) => {
  if (newValue === true) {
    let res = await houseStore.getHouseByPageAsync()
    if (res.code === 200) {
      isReachBottom.value = false
    }
  }
})

// 控制显示搜索框
// 第一种方法
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   if (newTop > 100) {
//     isShowSearchBar.value = true
//   } else {
//     isShowSearchBar.value = false
//   }
// })
// 第二种方法
// 如果依赖了某一个计算属性，当响应式数据发生改变，他会重新就行计算
// 定义的可响应式数据，依赖营外一个响应式的数据，那么可以使用计算属性(computd)
const isShowSearchBar = computed(() => {
  return scrollTop.value > 330 ? true : false
})

// 跳转回home时，保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})
</script>

<style lang="less" name="home" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
  // padding-bottom: 60px;
  .searh-bar {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    padding: 16px 16px 10px;
    background-color: #fff;
    box-sizing: border-box;
    z-index: 999;
  }
}
</style>
