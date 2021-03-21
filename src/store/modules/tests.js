import { getTests } from '../../api/test';

export default {
    state: {
        tests: []
    },
    getters: {
        TESTS: state => state.tests
    },
    mutations: {
        SET_TESTS(state, payload) {
            state.tests = payload;
        }
    },
    actions: {
        async GET_TESTS({commit}) {
            const tests = await getTests();

            commit('SET_TESTS', tests);
        }
    }
}