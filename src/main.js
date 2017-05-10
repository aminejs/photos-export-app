import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import VueResource from 'vue-resource'

import {routes} from './routes'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('paginate', Paginate);

Vue.http.options.root = 'https://export-app-db.firebaseio.com/data.json';

const router = new VueRouter({
   routes,
   mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
