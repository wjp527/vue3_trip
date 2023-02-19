<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData" :key="item.text">
      <div
        class="tab-bar-item"
        @click="change(item, index)"
        :class="{ active: currentIndex === index }"
      >
        <img
          :src="
            getAssetURL(currentIndex !== index ? item.image : item.imageActive)
          "
          alt=""
        />
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { tabbarData } from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/get_assets_img'
// 路由
import { useRouter } from 'vue-router'

let currentIndex = ref(0)
const Router = useRouter()
const change = (item: any, index: number) => {
  Router.push(item.path)
  currentIndex.value = index
}
</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f3f3f3;
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.active {
      color: var(--primary-color);
    }

    img {
      width: 36px;
    }
    .text {
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
</style>
