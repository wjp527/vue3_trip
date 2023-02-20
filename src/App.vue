<template>
  <div class="App">
    <router-view>
      <template #default="props">
        <keep-alive include="home">
          <component :is="props.Component"></component>
        </keep-alive>
      </template>
    </router-view>
    <Loading v-show="loading" />
    <TabBar v-show="!Route.meta.hideTabBar" />
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
