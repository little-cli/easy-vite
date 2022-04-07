import { createApp } from 'vue'
// import App from './App.vue'
// import Mouse from './Mouse.vue'
import router from './routes'
import Main from './Main.vue'
// createApp(App).mount('#app')
// createApp(Mouse).mount('#app')

const app = createApp(Main)

app.use(router).mount('#app')
