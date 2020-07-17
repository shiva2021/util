import Vue from 'vue'
// import router from './assets/js/router'
// import store from "./store";
// import App from '@/components/layout/App'
import axios from "axios";


var axiosInstance = axios.create({
    baseURL: location.origin
});

Vue.prototype.$axios = axiosInstance;


Vue.config.productionTip = false


new Vue({
    el: '#app',
    // router,
    // store,
    // components: { App },
    template: '<App/>'
})