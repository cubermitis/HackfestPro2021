import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Index from '@/components/Index'
import Monitor from '@/components/Monitor'
import NotFound from '@/components/NotFound'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Index', component: Index },
  { path: '/monitor', name: 'Monitor', component: Monitor },
  { path: '*', name: 'NotFound', component: NotFound}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
