import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Paginate from 'vuejs-paginate'

import {routes} from './routes'

Vue.use(VueRouter);
Vue.component('paginate', Paginate);

const router = new VueRouter({
   routes,
   mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});