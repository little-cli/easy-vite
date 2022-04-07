<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { $computed, $ref } from 'vue/macros'

const { lists, itemSize = 100 } = defineProps<{
  lists: number[]
  itemSize?: number
}>()

const list = $ref<HTMLElement>()
const state = reactive({
  //可视区域高度
  screenHeight: 0,
  //偏移量
  startOffset: 0,
  //起始索引
  start: 0,
  //结束索引
  end: 0
})
// 列表总高度
const listHeight = $computed(() => lists.length * itemSize + 'px')
// 可显示列表
const visibleCount = $computed(() => state.screenHeight / itemSize)
// 偏移量对应的style
const getTransform = $computed(() => `translate3d(0,${state.startOffset}px,0)`)
// 显示的真实数据
const visibleData = $computed(() =>
  lists.slice(state.start, Math.min(state.end, lists.length))
)

const itemStyle = $computed(() => `${itemSize}px`)

function scrollEvent() {
  // 当前滚动位置
  let scrollTop = list.scrollTop
  state.start = scrollTop / itemSize
  state.end = state.start + visibleCount
  // 此时的偏移量
  state.startOffset = scrollTop - (scrollTop % itemSize)
}

onMounted(() => {
  state.screenHeight =
    document.body.clientHeight || document.documentElement.clientHeight
  state.start = 0
  state.end = state.start + visibleCount
})
</script>

<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent()">
    <div class="infinite-list-phantom"></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div class="infinite-list-item" v-for="item in visibleData" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
  height: v-bind(listHeight);
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #f59d14;
  box-sizing: border-box;
  border-bottom: 1px solid #f59d14;
  height: v-bind(itemStyle);
  line-height: v-bind(itemStyle);
}

.infinite-list-container::-webkit-scrollbar {
  width: 0.2rem;
}

.infinite-list-container::-webkit-scrollbar-thumb {
  background-color: #fff;
  width: 0.1rem;
  border-radius: 1rem;
}
</style>
