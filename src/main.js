import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick' // 三秒延迟解决
import 'amfe-flexible'
import './assets/css/reset.css'
import './assets/css/border.css'

Vue.config.productionTip = false

fastclick.attach(document.body)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
