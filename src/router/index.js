import Vue from 'vue'
import VueRouter from  'vue-router'
import Home from '../components/HelloWorld.vue'
import Users from '../components/User/Users'
import Groups from '../components/Group/Groups'
import Exams from '../components/Exam/Exams'
import UsersAdd from '../components/User/UsersAdd'
import ExamAdd from '../components/Exam/ExamAdd'
import GroupUsersList from "@/components/Group/GroupUsersList";


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
        path: "/users/add",
        name: "usersAdd",
        component: UsersAdd
    },
    {
        path: "/groups",
        name: "groups",
        component: Groups
    },
    {
        path: "/groups/list",
        name: "groupUsersList",
        component: GroupUsersList
    },
    {
        path: "/exams",
        name: "exams",
        component: Exams
    },
    {
        path: "/examsAdd",
        name: "examsAdd",
        component: ExamAdd
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
