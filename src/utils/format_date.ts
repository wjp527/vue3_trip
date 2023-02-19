// 格式化时间
import dayjs from 'dayjs'

// 这两种显示的格式不同
// 格式化日期
export function formatMonthDay(date: Date | number, formatStr = 'MM月DD日') {
  return dayjs(date).format(formatStr)
}

// 计算时间差
export function getDiffDays(startDate: any, endDate: any) {
  return dayjs(endDate).diff(startDate, 'day')
}
