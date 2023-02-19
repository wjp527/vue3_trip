export const getAssetURL = (image: string) => {
  // 参数一: 相对路径
  // 参数二:
  return new URL(`../assets/img/tabbar/${image}`, import.meta.url).href
}
