import { getExams, joinExam } from '../../api/exam';
import { fixExamData } from '../../helpers'

export default {
    state: {
        exams: [],
        executed: null,
        questions: []
    },
    getters: {
        EXAMS: state => fixExamData(state.exams),
        EXECUTED: state => state.executed,
        EXAM_QUESTIONS: state => state.questions,
    },
    mutations: {
        SET_EXAMS(state, payload) {
            state.exams = payload;
        },
        SET_EXECUTED(state, payload) {
            state.executed = payload;
        },
        SET_EXAM_QUESTIONS(state, payload) {
            state.questions = payload;
        }
    },
    actions: {
        async GET_EXAMS({commit}) {
            const exams = await getExams();

            commit('SET_EXAMS', exams)
        },
        async START_EXAM({commit}, examId) {
            const openedExam = await joinExam(examId);

            if (openedExam === undefined) {
                throw Error('something goes wrong');
            }

            commit('SET_EXECUTED', openedExam);
            commit('SET_EXAM_QUESTIONS', openedExam.test.questions);
        }
    }
}