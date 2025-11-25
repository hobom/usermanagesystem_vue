import {createApp} from 'vue'
import SvgIcon from '@/icons'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import '@/assets/styles/border.css'
import '@/assets/styles/reset.css'

// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
const app = createApp(App)
SvgIcon(app);

app.use(store)

app.use(router)

app.use(ElementPlus)
app.mount('#app')