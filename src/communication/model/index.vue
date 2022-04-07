<script setup lang="ts">
import { $ref } from 'vue/macros'
import Child from './child.vue'

const lists = $ref(['js', 'html', 'css'])
</script>

<template>
  <h2>Model:</h2>
  <h2 v-for="list in lists" :key="list">{{ list }}</h2>

  <Child v-model:lists="lists" />
</template>
