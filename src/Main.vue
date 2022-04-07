<script lang="ts" setup>
import { routes } from './routes'
console.log(routes)
const links = routes.map((item) => item.path)

console.log(links)
</script>

<template>
  <div class="main">
    <div class="links">
      <router-link
        class="link"
        v-for="link in links"
        :key="link"
        :to="{
          path: link
        }"
        >{{ link }}</router-link
      >
    </div>
    <div class="area">
      <router-view />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  background-color: #000;
}
a {
  color: #f59d14;
  text-decoration: none;
}
h2 {
  color: #f59d14;
  text-transform: uppercase;
}
.main {
  display: flex;
  height: 100vh;
}
.links {
  width: 20vw;
  border-right: 1px solid #ccc;
  padding: 5vw;
}
.link {
  display: block;
  padding: 2vh 0;
}
.area {
  padding: 5vw;
  flex: 1;
}
</style>
