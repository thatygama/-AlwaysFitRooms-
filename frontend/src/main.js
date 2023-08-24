import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@Config/axios.js';
import functions from '@Config/functions.js';
import moment from 'moment-timezone';
import lodash from 'lodash';
import {
  EventBus
} from '@Config/eventBus.js';
import './styles/global.css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';


Vue.use(Vuetify);

Vue.config.productionTip = false;


moment.locale('pt-BR');
moment.tz.setDefault('America/Sao_Paulo');

Vue.prototype.$eventBus = EventBus;
Vue.prototype.$lodash = lodash;
Vue.prototype.$functions = functions;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
