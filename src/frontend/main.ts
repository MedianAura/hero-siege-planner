import 'reflect-metadata';
import { store } from './stores';
import './ioc';
import Vue from 'vue';
import App from './app.vue';
import router from './router';
import './plugins';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
