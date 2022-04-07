<script setup lang="ts">
import Virtual from './virtual.vue'
import { $ref } from 'vue/macros'
const lists = $ref<number[]>([])
for (let i = 0; i < 1000; i++) {
  lists.push(i)
}
</script>

<template>
  <h2>Virtual List</h2>
  <Virtual :lists="lists" />
</template>
