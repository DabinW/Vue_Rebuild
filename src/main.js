// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from './routes'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import Mock from './mock'
// Mock.bootstrap();
import $ from 'jquery'
import 'bootstrap/js/bootstrap.min.js'
import 'bootstrap/css/bootstrap.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index.js'
import qs from 'qs'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$qs = qs;
import axios from 'axios'
Vue.prototype.$ajax = axios

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
// Vue.config.productionTip = false

const router = new VueRouter({
 //  mode: 'history',
 // routes: routes
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
