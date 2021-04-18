import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from "./store/store"
import moment from 'moment';

moment.locale('pl');

Vue.config.productionTip = false

Vue.use(ElementUI)

// Vue.locale('en', {
//   datepicker: {
//     now: 'now',
//     today: 'today',
//     cancel: 'cancel',
//     clear: 'clear',
//     confirm: 'confirm',
//     selectDate: 'selectDate',
//     selectTime: 'selectTime',
//     startTime: 'startTime',
//     endTime: 'endTime',
//     year: 'year',
//     month: 'Month',
//     week: 'week',
//     weeks: {
//       sun: 'sun',
//       mon: 'mon',
//       tue: 'tue',
//       wed: 'wed',
//       thu: 'thu',
//       fri: 'fri',
//       sat: 'sat'
//     },
//     months: {
//       jan: 'jan',
//       feb: 'feb',
//       mar: 'mar',
//       apr: 'apr',
//       may: 'may',
//       jun: 'jun',
//       jul: 'jul',
//       aug: 'aug',
//       sep: 'sep',
//       oct: 'oct',
//       nov: 'nov',
//       dec: 'dec'
//     }
//   }
// });

axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
// axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
