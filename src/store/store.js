import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import exam from "./modules/exam";
import tests from "./modules/tests";
import users from "./modules/users";
import questions from "./modules/questions";
import security from "./modules/security";

export default new Vuex.Store({
    modules: {
        exam,
        tests,
        users,
        questions,
        security
    }
})