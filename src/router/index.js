import Vue from 'vue'
import VueRouter from  'vue-router'
import Home from '../components/HelloWorld.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
