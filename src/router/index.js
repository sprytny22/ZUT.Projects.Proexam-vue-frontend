import Vue from 'vue'
import VueRouter from  'vue-router'
import Home from '../components/HelloWorld.vue'
import Users from '../components/Users'
import Groups from '../components/Groups'
import Exams from '../components/Exams'


Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/users",
        name: "users",
        component: Users
    },
    {
        path: "/groups",
        name: "groups",
        component: Groups
    },
    {
        path: "/exams",
        name: "exams",
        component: Exams
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
