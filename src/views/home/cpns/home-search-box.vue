<template>
  <div class="home-search-box">
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>

    <!-- 位置 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <p class="text">我的位置</p>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line">
      <div class="start">
        <div class="date" @click="show = true">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
      </div>
      <div class="stay">共{{ stayCount }}晚</div>
      <div class="end">
        <div class="date" @click="show = true">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>

    <!-- 日期区间 -->
    <van-calendar
      v-model:show="show"
      :max-date="new Date(2023, 11, 31)"
      type="range"
      @confirm="onConfirm"
    />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="hot-suggests">
      <!-- <pre>{{ hots }}</pre> -->
      <div class="section">
        <template v-for="(item, index) in hots" :key="index">
          <div
            :style="{
              color: item.tagText.color,
              background: item.tagText.background.color
            }"
            class="item"
          >
            {{ item.tagText.text }}
          </div>
        </template>
      </div>
      <div class="section">
        <button class="btn" @click="handlerSearch">开始搜索</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
// store 状态管理
import useCity from '@/store/modules/city/city'
import useHot from '@/store/modules/hotSuggests/hotSuggests'
import useHouse from '@/store/modules/home/home'
// 格式化时间
import { formatMonthDay, getDiffDays } from '@/utils/format_date'

const Router = useRouter()
const cityStore = useCity()
const houseStore = useHouse()
// 获取热门建议
const hotStore = useHot()
const { hots } = hotStore

// 当前位置
const { currentCity } = cityStore
// 位置/城市
const cityClick = () => {
  Router.push('/city')
}
// 获取当前位置
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log(err)
    }
  )
}

// 日期范围的处理
// 设置开始时间
const nowDate = new Date()
let newDate = new Date()
// 设置结束时间
newDate.setDate(nowDate.getDate() + 1)
// 格式化时间 11月11日
const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(newDate))

// 格式化时间11.11
houseStore.startTime = formatMonthDay(nowDate, 'MM.DD')
houseStore.endTime = formatMonthDay(newDate, 'MM.DD')

// 时间差
const stayCount = ref(getDiffDays(nowDate, newDate))

// 是否显示日历
const show = ref(false)

// 确定入住时间的时间
const onConfirm = (values: any) => {
  const [start, end] = values
  show.value = false
  // 格式: 11月11日
  startDate.value = formatMonthDay(start)
  endDate.value = formatMonthDay(end)
  // 格式: 11.11
  houseStore.startTime = formatMonthDay(start, 'MM.DD')
  houseStore.endTime = formatMonthDay(end, 'MM.DD')
  // 计算时间差
  stayCount.value = getDiffDays(start, end)
}

// 开始搜索
const handlerSearch = () => {
  Router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.cityName
    }
  })
}
</script>

<style lang="less" scoped>
.home-search-box {
  .banner {
    img {
      width: 100%;
    }
  }
  .location {
    display: flex;
    align-items: center;
    padding: 0 20px;
    .city {
      flex: 1;
    }
    .position {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
      .text {
        font-size: 12px;
        margin-right: 4px;
      }
      img {
        width: 18px;
      }
    }
  }

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

  .date-range {
    height: 44px;
    .stay {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }

  .price-counter {
    .start {
      border-right: 1px solid var(--line-color);
    }
  }

  .hot-suggests {
    .item {
      padding: 4px 8px;
      border-radius: 3px;
      margin: 5px 3px;
      font-size: 12px;
    }
    .btn {
      width: 100%;
      border: none;
      height: 32px;
      border-radius: 20px;
      color: #fff;
      margin: 8px 0;
      background: var(--theme-linear-gradient);
    }
  }
}

.bottom-gray-line {
  .start {
  }
}
</style>
