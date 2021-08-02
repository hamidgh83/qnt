require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import router from './router'
import store from "./stores/user"
import App from "./App.vue"
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.use(VueRouter)

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount("#app");