<script setup lang="ts">
import { $ref } from 'vue/macros'
const emits = defineEmits(['update:list'])
const props = defineProps<{
  lists: string[]
}>()
let list = $ref('')

function doAdd() {
  const temp = props.lists
  temp.push(list)
  emits('update:list', temp)
  list = ''
}
</script>
<template>
  <input type="text" v-model="list" />
  <button @click="doAdd">Add</button>
</template>
