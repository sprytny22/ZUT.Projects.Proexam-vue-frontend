import { getExam } from '../../api/exam';

export default {
    state: {
        exams: []
    },
    getters: {
        EXAMS: state => state.exams
    },
    mutations: {
        SET_EXAMS(state, payload) {
            state.exams = payload;
        }
    },
    actions: {
        async GET_EXAMS({commit}) {
            const {exams} = await getExam();

            commit('SET_TESTS', exams)
        }
    }
}