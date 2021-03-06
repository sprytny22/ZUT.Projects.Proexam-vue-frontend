import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from "./store/store"

Vue.config.productionTip = false

Vue.use(ElementUI)

axios.defaults.baseURL = process.env.VUE_APP_API_HOST;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
