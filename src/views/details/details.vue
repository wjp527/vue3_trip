<template>
  <div class="details">
    <van-nav-bar
      title="酒店详情"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <DetailSwiper v-if="getSwiper" :swiperData="getSwiper" />

    <!-- <pre>{{ houseDetails }}</pre> -->
  </div>
</template>

<script lang="ts" setup>
// router
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
// store
import useDetails from '@/store/modules/details/details'

import DetailSwiper from './cpns/detail-swiper.vue'
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
</script>

<style lang="less" scoped></style>
