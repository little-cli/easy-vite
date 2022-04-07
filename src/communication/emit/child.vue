<script setup lang="ts">
import { $ref } from 'vue/macros'
const emits = defineEmits(['add'])
let list = $ref('')

function doAdd() {
  emits('add', list)
  list = ''
}
</script>
<template>
  <input type="text" v-model="list" />
  <button @click="doAdd">Add</button>
</template>
