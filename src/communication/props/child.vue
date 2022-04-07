<script setup lang="ts">
const props = defineProps<{
  lists: string[]
}>()
</script>
<template>
  <h2 v-for="list in props.lists" :key="list">{{ list }}</h2>
</template>
