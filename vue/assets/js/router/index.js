import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home.vue'
Vue.use(Router)

export default new Router({
    mode: 'history', // use HTML5 history instead of hashes
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
    ]
})