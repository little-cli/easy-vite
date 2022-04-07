<script setup lang="ts">
import { provide } from 'vue'
import { $ref } from 'vue/macros'
import Child from './child.vue'

const lists = $ref(['js', 'html', 'css'])
let list = $ref('')

function doAdd() {
  lists.push(list)
  list = ''
}
provide('lists', lists)
</script>

<template>
  <h2>provide/inject:</h2>
  <Child />
  <input type="text" v-model="list" />
  <button @click="doAdd">Add</button>
</template>
