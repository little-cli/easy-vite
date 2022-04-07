<script setup lang="ts">
import { $ref } from 'vue/macros'
import Child from './child.vue'
type ChildRefsType = typeof Child
const childRefs = $ref<ChildRefsType>()
</script>

<template>
  <h2>Refs:</h2>
  <Child ref="childRefs" />
  <h2 v-for="list in childRefs?.lists" :key="list">{{ list }}</h2>
</template>
