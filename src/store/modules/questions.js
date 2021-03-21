import { getQuestions } from '../../api/question';

export default {
    state: {
        questions: []
    },
    getters: {
        QUESTIONS: state => state.questions
    },
    mutations: {
        SET_QUESTIONS(state, payload) {
            state.questions = payload;
        }
    },
    actions: {
        async GET_QUESTIONS({commit}) {
            const questions = await getQuestions();

            commit('SET_QUESTIONS', questions)
        }
    }
}