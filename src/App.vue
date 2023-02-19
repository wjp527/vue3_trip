<template>
  <div class="App">
    <router-view></router-view>

    <Loading v-if="loading" />
    <TabBar v-if="!Route.meta.hideTabBar" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
// store
import useCommon from '@/store/modules/common/common'
import Loading from '@/components/loading/index.vue'
import TabBar from '@/components/tab-bar/index.vue'
const commonStore = useCommon()
const { loading } = storeToRefs(commonStore)
const Route = useRoute()
</script>

<style lang="less" scoped></style>
