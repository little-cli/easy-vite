<script setup lang="ts">
import { $ref } from 'vue/macros'
import Child from './child.vue'

const lists = $ref(['js', 'html', 'css'])
let list = $ref('')

function doAdd() {
  lists.push(list)
  list = ''
}
</script>

<template>
  <h2>props:</h2>
  <input type="text" v-model="list" />
  <button @click="doAdd">Add</button>
  <Child :lists="lists" />
</template>
