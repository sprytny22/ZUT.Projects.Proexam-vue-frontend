import { getExams } from '../../api/exam';
import { fixExamData } from '../../helpers'

export default {
    state: {
        exams: []
    },
    getters: {
        EXAMS: state => fixExamData(state.exams)
    },
    mutations: {
        SET_EXAMS(state, payload) {
            state.exams = payload;
        }
    },
    actions: {
        async GET_EXAMS({commit}) {
            const exams = await getExams();

            commit('SET_EXAMS', exams)
        }
    }
}