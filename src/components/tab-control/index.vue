<template>
  <div class="tab-control">
    <template v-for="(item, index) in names" :key="item">
      <div
        class="tab-control-item"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    names: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  emits: ['tabItemClick'],
  methods: {
    itemClick(index: number) {
      this.currentIndex = index
      this.$emit('tabItemClick', index)
    },
    setCurrentIndex(index: number) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.tab-control {
  position: fixed;
  top: 0px;
  z-index: 9999;
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item.active {
  color: var(--primary-color);
  font-weight: 700;
}

.tab-control-item.active span {
  border-bottom: 3px solid var(--primary-color);
  padding: 8px;
}
</style>
