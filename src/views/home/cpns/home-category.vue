<template>
  <div class="section hot-categories">
    <template v-for="item in hotRecommend" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="" />
        <p class="text">{{ item.title }}</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import useHot from '@/store/modules/hotSuggests/hotSuggests'
// 获取热门类别
const hotStore = useHot()
const { hotRecommend } = hotStore
</script>

<style lang="less" scoped>
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  // height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    text-align: right;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.hot-categories {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  height: 80px;
  padding: 0 10px;
  margin-top: 8px;
  // 隐藏下面的滚动条
  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70px;
    text-align: center;

    img {
      width: 32px;
      height: 32px;
    }

    .text {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>
