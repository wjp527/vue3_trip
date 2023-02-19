import { onMounted, onUnmounted, ref } from 'vue'
// 节流
import { throttle } from 'lodash'
// export default function useScroll(reachBottomCB: any) {
//   // 监听window窗口的滚动
//   // 离开页面时，需要移除监听
//   const scrollListenerHandler = () => {
//     // 获取滚动条位置 距离顶部的距离
//     const scrollTop = document.documentElement.scrollTop
//     // 获取文档实际高度
//     const scrollHeight = document.documentElement.scrollHeight
//     // 屏幕可视区域高度
//     const clientHeight = document.documentElement.clientHeight
//     // 获取滚动距离加上屏幕可视区域的高度
//     const num = clientHeight + scrollTop
//     console.log(num, scrollHeight)
//     if (Math.ceil(num) >= scrollHeight) {
//       reachBottomCB()
//     }
//   }

//   // 页面渲染完毕后进行监听
//   onMounted(() => {
//     window.addEventListener('scroll', scrollListenerHandler)
//   })

//   // 离开页面时，移除监听
//   onUnmounted(() => {
//     window.removeEventListener('scroll', scrollListenerHandler)
//   })
// }

// 监听window窗口的滚动

export default function useScroll() {
  // 定义一个变量，用来判断是否滚动到了底部
  const isReachBottom = ref(false)
  // 获取滚动条位置 距离顶部的距离
  const scrollTop = ref(0)
  // 获取文档实际高度
  const scrollHeight = ref(0)
  // 屏幕可视区域高度
  const clientHeight = ref(0)

  // 节流
  const scrollListenerHandler = throttle(() => {
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight
    clientHeight.value = document.documentElement.clientHeight
    // 获取滚动距离加上屏幕可视区域的高度
    const num = clientHeight.value + scrollTop.value

    if (Math.ceil(num) >= scrollHeight.value) {
      isReachBottom.value = true
    }
  }, 100)

  // 页面渲染完毕后进行监听
  onMounted(() => {
    window.addEventListener('scroll', scrollListenerHandler)
  })

  // 离开页面时，移除监听
  onUnmounted(() => {
    // window.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isReachBottom, scrollTop, scrollHeight, clientHeight }
}
