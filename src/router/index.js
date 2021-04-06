import Vue from 'vue'
import VueRouter from  'vue-router'
import Home from '../components/HelloWorld.vue'
import Users from '../components/User/Users'
import Tests from '../components/Test/Tests'
import TestAdd from '../components/Test/TestAdd'
import QuestionAdd from '../components/Question/QuestionAdd'
import Questions from '../components/Question/Questions'
import Groups from '../components/Group/Groups'
import Exams from '../components/Exam/Exams'
import UsersAdd from '../components/User/UsersAdd'
import ExamAdd from '../components/Exam/ExamAdd'
import Main from '../components/Exam/Main'
import Watch from '../components/Exam/Watch'
import WatchList from '../components/Exam/WatchList'
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
        path: "/tests",
        name: "tests",
        component: Tests
    },
    {
        path: "/test/add",
        name: "testAdd",
        component: TestAdd
    },
    {
        path: "/questions",
        name: "questions",
        component: Questions
    },
    {
        path: "/question/add",
        name: "questionAdd",
        component: QuestionAdd
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
    {
        path: "/main",
        name: "main",
        component: Main
    },
    {
        path: "/watch/:examId/user/:userId",
        name: "watch",
        component: Watch
    },
    {
        path: "/watchList/:id",
        name: "watchList",
        component: WatchList
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
