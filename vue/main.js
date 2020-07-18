import Vue from 'vue'
import router from './assets/js/router'
import store from "./store";
import App from '@/components/layout/App'
import axios from "axios";
import Buefy from 'buefy'
import jQuery from "jquery";

Vue.use(Buefy)

window.jQuery = jQuery;

var axiosInstance = axios.create({
    baseURL: location.origin
});

Vue.prototype.$axios = axiosInstance;


Vue.config.productionTip = false


new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})