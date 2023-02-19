<template>
  <div class="city">
    <div class="top">
      <van-search
        v-model="searchValue"
        shape="round"
        placeholder="城市/区域/位置"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />

      <van-tabs v-model:active="activeName">
        <!-- 对象遍历 -->
        <!--
        第一个参数: 数据
        第二个参数: 键名
        第三个参数: 索引
       -->
        <template v-for="(value, key, index) in cities" :key="index">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="content">
      <template v-for="(value, key, index) in cities" :key="index">
        <CityGroup v-show="key === tabActive" :currentGroup="value" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// 请求
import useCity from '@/store/modules/city/city'
// 状态管理
import { storeToRefs } from 'pinia'
// 组件
import CityGroup from './cpns/city-group.vue'

// 搜索框数据
const searchValue = ref('')
// tab默认选中
const activeName = ref()
const Router = useRouter()

const cityStore = useCity()
// 调用城市接口
cityStore.getCityAll()
// 获取城市接口
const { cities } = storeToRefs(cityStore)
const tabActive = ref(activeName)

// 不能这么写，因为这样获取的currentGroup不是响应式的
// const currentGroup = cities.value[tabActive.value]
// 这个tab会不断变化，而直接赋值的话，他就只会存放第一次的值，之后改变，他也不会进行修改
// 而computed，是只要里面的依赖发生改变，他就会重新渲染页面
const currentGroup = computed(() => cities.value[tabActive.value])

// 搜索框的回车事件
const onSearch = (val: any) => {
  console.log(val)
}
// 返回上一页
const onCancel = () => {
  Router.back()
}
</script>

<style lang="less" scoped>
.city {
  // 第一种方法: 固定定位
  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }

  // .content {
  //   margin-top: 100px;
  // }
  .top {
    position: relative;
    z-index: 9;
  }
  // 第二种方法: 布局滚动
  .content {
    height: calc(100vh - 100px);
    overflow-y: auto;
  }
}
</style>
