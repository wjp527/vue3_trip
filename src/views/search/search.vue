<template>
  <div class="search">
    <h2>search</h2>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const Route = useRoute()
console.log(Route.query)
</script>

<style lang="less" scoped></style>
