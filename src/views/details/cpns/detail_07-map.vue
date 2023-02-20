<template>
  <div class="home">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<script setup>
import DetailSection from '@/components/detail-section/detail-scection.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

const mapRef = ref()

onMounted(() => {
  const map = new BMapGL.Map(mapRef.value) // 创建地图实例
  const point = new BMapGL.Point(
    props.position.longitude,
    props.position.latitude
  ) // 创建点坐标
  map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
  const marker = new BMapGL.Marker(point)
  map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
  // map.setHeading(64.5) //设置地图旋转角度
  // map.setTilt(73) //设置地图的倾斜角度
  var scaleCtrl = new BMapGL.ScaleControl() // 添加比例尺控件
  map.addControl(scaleCtrl)
  var zoomCtrl = new BMapGL.ZoomControl() // 添加缩放控件
  map.addControl(zoomCtrl)
  // 要足够宽才能显示出城市列表控件
  var cityCtrl = new BMapGL.CityListControl({
    // 控件的停靠位置（可选，默认左上角）
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // 控件基于停靠位置的偏移量（可选）
    offset: new BMapGL.Size(10, 5)
  }) // 添加城市列表控件
  map.addControl(cityCtrl)
  // 创建点标记
  var marker1 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.925))
  var marker2 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.915))
  var marker3 = new BMapGL.Marker(new BMapGL.Point(116.395, 39.935))
  var marker4 = new BMapGL.Marker(new BMapGL.Point(116.415, 39.931))
  // 在地图上添加点标记(北京)
  map.addOverlay(marker1)
  map.addOverlay(marker2)
  map.addOverlay(marker3)
  map.addOverlay(marker4)
  map.addOverlay(marker)
})
</script>

<style lang="less" scoped>
.baidu {
  height: 250px;
}
</style>
