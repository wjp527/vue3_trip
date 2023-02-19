<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in swiperData" :key="index" class="">
      <img :src="item?.url" alt="" style="width: 100%" />
    </van-swipe-item>
    <template #indicator="{ active }">
      <!-- active: 当前选中的轮播图索引 -->
      <div class="indicator">
        <template v-for="(value, key) in swiperGroup" :key="key">
          <div
            class="item"
            :class="{
              active: swiperData?.[active]?.enumPictureCategory == key
            }"
          >
            <span>{{ getName(value[0].title) }}:</span>
            <span v-if="swiperData?.[active]?.enumPictureCategory == key"
              >{{ getCategoryIndex(swiperData[active]) }} /
              {{ value.length }}
            </span>
          </div>
        </template>
      </div>
    </template>
  </van-swipe>
</template>

<script lang="ts" setup>
const props = defineProps({
  swiperData: {
    type: Array,
    default: () => []
  }
})

// swiperGroup数据的格式类型判断
interface ISwiperGroup {
  [key: string]: any
}
const swiperGroup: ISwiperGroup = {}
// 对数据进行转换
// 第一钟方法

for (const item of props.swiperData) {
  let valueArray = swiperGroup[item.enumPictureCategory]
  // 没有值的话，就赋空数组，并添加到要展示的那个数组里面
  if (!valueArray) {
    valueArray = []
    swiperGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}

// 第二钟方法
// for (const item of props.swiperData) {
//   swiperGroup[item.enumPictureCategory] = []
// }
// for (const item of props.swiperData) {
//   const valueArray = swiperGroup[item.enumPictureCategory]
//   valueArray.push(item)
// }

// 定义转换数据的方法
const nameReg = /\【(.*?)】/i
const getName = (name: string) => {
  // 第一种方法
  // return name.replace('：', '').replace('【', '').replace('】', '')
  // 第二种方法
  const results = nameReg.exec(name)
  return results?.[1]
}

const getCategoryIndex = (item: any) => {
  const valueArray = swiperGroup[item.enumPictureCategory]
  return (
    valueArray.findIndex(
      (data: any) => JSON.stringify(data) === JSON.stringify(item)
    ) + 1
  )
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
}

.indicator {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 200px;
  height: 32px;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
}
.item {
  font-size: 12px;
  &.active {
    color: #333;
    background-color: #fff;
    padding: 4px;
    border-radius: 6px;
  }
}
</style>
