import { getExams, joinExam } from '../../api/exam';
import { fixExamData } from '../../helpers'

export default {
    state: {
        exams: [],
        currentResultId: null,
        currentExamName: null,
        currentTestName: null,
        questions: []
    },
    getters: {
        EXAMS: state => fixExamData(state.exams),
        CURRENT_RESULT_ID: state => state.currentResultId,
        CURRENT_EXAM_NAME: state => state.currentExamName,
        CURRENT_TEST_NAME: state => state.currentTestName,
        CURRENT_QUESTIONS: state => state.questions,
    },
    mutations: {
        SET_EXAMS(state, payload) {
            state.exams = payload;
        },
        SET_CURRENT_EXAM_NAME(state, payload) {
            state.currentExamName = payload;
        },
        SET_CURRENT_TEST_NAME(state, payload) {
            state.currentTestName = payload;
        },
        SET_CURRENT_QUESTIONS(state, payload) {
            state.questions = payload;
        },
        SET_CURRENT_RESULT(state, payload) {
            state.currentResultId = payload;
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

            commit('SET_CURRENT_RESULT', openedExam.result);
            commit('SET_CURRENT_EXAM_NAME', openedExam.exam);
            commit('SET_CURRENT_TEST_NAME', openedExam.test);
            commit('SET_CURRENT_QUESTIONS', openedExam.questions);
        }
    }
}