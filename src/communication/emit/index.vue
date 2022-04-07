<script setup lang="ts">
import { $ref } from 'vue/macros'
import Child from './child.vue'

const lists = $ref(['js', 'html', 'css'])
function doAdd(val: string) {
  lists.push(val)
}
</script>

<template>
  <h2>emit:</h2>
  <Child @add="doAdd" />
  <h2 v-for="list in lists" :key="list">{{ list }}</h2>
</template>
