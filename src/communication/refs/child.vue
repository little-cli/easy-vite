<script setup lang="ts">
import { $ref } from 'vue/macros'
let list = $ref('')
const lists = $ref(['js', 'html', 'css'])

function doAdd() {
  lists.push(list)
  list = ''
}
defineExpose({
  lists
})
</script>
<template>
  <input type="text" v-model="list" />
  <button @click="doAdd">Add</button>
</template>
