<script setup lang="ts">
import { onMounted } from 'vue'
import { useMouse } from './hooks/useMouse'
import { usePlum } from './hooks/usePlum'
const { x, y } = useMouse()

const { el, init } = usePlum()

onMounted(() => init())
</script>

<template>
  <h2>Fang x:{{ x }} y:{{ y }}</h2>
  <canvas
    ref="el"
    width="600"
    height="600"
    style="border: 1px solid #ccc; margin-left: 2px"
  />
</template>
