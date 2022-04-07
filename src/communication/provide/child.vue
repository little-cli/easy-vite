<script setup lang="ts">
import { inject } from 'vue'

const lists = inject('lists')
</script>
<template>
  <h2 v-for="list in lists" :key="list">{{ list }}</h2>
</template>
