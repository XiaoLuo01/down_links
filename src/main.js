import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick' // 三秒延迟解决
import VueLazyLoad from 'vue-lazyload'
import 'amfe-flexible'
import './assets/css/reset.css'
import './assets/css/border.css'
import iconImg from './assets/img/default-icon.png'
import adImg from './assets/img/ad-img.png'
import footerImg from './assets/img/footer-img.png'

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('@/assets/img/ad-img.png'),
  adapter: {
    loading ({el}) {
      const className = el.className;
      if (className.indexOf('type-0') !== -1) {
        el.src = iconImg;
      } else if (className.indexOf('type-1') !== -1) {
        el.src = footerImg;
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
