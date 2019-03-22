// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import {post,fetch,patch,put} from './util/http'
import { getLocal,renderBtn,loopBtn } from '@/util/util'

Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$axios = axios;
Vue.prototype.$getLocal = getLocal;
Vue.prototype.$renderBtn = renderBtn;
Vue.prototype.$loopBtn = loopBtn;

Vue.config.productionTip = false
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
