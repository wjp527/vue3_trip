<template>
  <div class="details" ref="detailRef">
    <TabConrol
      v-if="showTabControl"
      ref="tabControlRef"
      :names="names"
      @tabItemClick="tabClick"
    />
    <van-nav-bar
      title="酒店详情"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div v-if="getMainPart" v-memo="[getMainPart]">
      <!-- 轮播图 -->
      <DetailSwiper v-if="getSwiper" :swiperData="getSwiper" />
      <!-- 酒店信息 -->
      <DetailInfos
        name="描述"
        :ref="getSectionRef"
        :topInfos="getMainPart.topModule"
      />
      <!-- 房屋设施 -->
      <DetailFacility
        name="设施"
        :ref="getSectionRef"
        :houseFacility="getMainPart?.dynamicModule.facilityModule.houseFacility"
      />
      <!-- 房东介绍 -->
      <DetailLandlord
        name="房东"
        :ref="getSectionRef"
        :landlord="getMainPart?.dynamicModule.landlordModule"
      />
      <!-- 热门评论 -->
      <DetailComment
        name="评论"
        :ref="getSectionRef"
        :comment="getMainPart?.dynamicModule.commentModule"
      />
      <!-- 预定须知 -->
      <DetailNotice
        name="须知"
        :ref="getSectionRef"
        :order-rules="getMainPart?.dynamicModule.rulesModule.orderRules"
      />
      <!-- 地图 -->
      <DetailMap
        name="周边"
        :ref="getSectionRef"
        :position="getMainPart?.dynamicModule.positionModule"
      />
      <DetailIntro :price-intro="getMainPart?.introductionModule" />
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
// router
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
// store
import useDetails from '@/store/modules/details/details'

import DetailSwiper from './cpns/detail_01-swiper.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailComment from './cpns/detail_05-comment.vue'
import DetailNotice from './cpns/detail_06-notice.vue'
import DetailMap from './cpns/detail_07-map.vue'
import DetailIntro from './cpns/detail_08-intro.vue'

import TabConrol from '@/components/tab-control/index.vue'
// 获取滚动的hooks
import useScroll from '@/hooks/useScroll'
import { values } from 'lodash'

const Route = useRoute()
const Router = useRouter()

const detailsStore = useDetails()
let id = Number(Route.params.id)
detailsStore.getHouseDetailsByIdAsync(id)

const { houseDetails, getMainPart, getSwiper } = storeToRefs(detailsStore)

// 返回到上一页
const onClickLeft = () => {
  Router.back()
}

// tabControl相关的操作
const detailRef = ref()

const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => scrollTop.value > 300)

const sectionEls = ref({})

const names = computed(() => {
  return Object.keys(sectionEls.value)
})

// 整合tab数组
// key: tab名字
// value: tab对应的组件
const getSectionRef = (value: any) => {
  if (!value) return
  // 获取组件根元素
  // value.$el
  // 获取键名
  const key = value.$el.getAttribute('name')
  sectionEls.value[key] = value.$el
}

// 点击tab，跳转到该位置
let isClick = false
let currentDistance = -1
const tabClick = (index: number) => {
  // let idx = names.value[index]
  let idx = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[idx]
  let distance = el.offsetTop

  if (index !== 0) {
    distance -= 44
  }
  isClick = true
  currentDistance = distance
  // 滚动
  detailRef.value.scrollTo({
    top: distance,
    behavior: 'smooth'
  })
}

const tabControlRef = ref()
watch(scrollTop, (newVal) => {
  // console.log(currentDistance, newVal)
  if (currentDistance === newVal) {
    isClick = false
  }
  if (isClick) return

  // console.log(newVal)
  // 将每个tabs的高度合并成一个数组
  let els = Object.values(sectionEls.value)
  let values = els.map((item) => item.offsetTop)
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newVal + 44) {
      index = i - 1
      break
    }
  }

  tabControlRef.value?.setCurrentIndex(index)
})
</script>

<style lang="less" scoped>
.details {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;

  overflow-y: auto;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
