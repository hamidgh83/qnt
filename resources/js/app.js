require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.use(VueRouter)

// let Market = require('./components/Market.vue')

const app = new Vue({
    el: '#app',
    vuetify,
    router
});
