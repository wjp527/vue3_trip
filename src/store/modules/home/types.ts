// 获取房屋列表数据的条件类型
export type IHouseByPage = number

// store里面的数据类型
export interface IHouseList {
  houseList: any[]
  currentPage: number
  startTime: string
  endTime: string
}
