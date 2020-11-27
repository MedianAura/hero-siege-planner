import Vue from 'vue';
import App from './app.vue';
import router from './router';
import Buefy from 'buefy';

Vue.config.productionTip = false;

Vue.use(Buefy, { defaultIconPack: 'fa' });

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
