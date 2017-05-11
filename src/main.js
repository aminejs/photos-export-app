import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import VueResource from 'vue-resource'

import {routes} from './routes'

//add VueRouter to Vue instance
Vue.use(VueRouter);
//add VueResource to Vue instance
Vue.use(VueResource);
//set the paginate component globally 
Vue.component('paginate', Paginate);

//confiure vue-resource globally, where all requests will be sent
Vue.http.options.root = 'https://export-app-db.firebaseio.com/data.json';

//pass the routes to the VueRouter with 'history mode' to overwrite the default mode which is 'hash mode' 
const router = new VueRouter({
   routes,
   mode: 'history'
});
//add the router to the vue instance
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
